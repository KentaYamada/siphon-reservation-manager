import moment from "moment";
import { each, filter, intersection, orderBy, times } from "lodash";
import { Reservation } from "@/entity/reservation";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeat } from "@/entity/reservation-seat";
import firebase from "@/plugins/firebase";
import { RESERVATION_DETAIL_URL } from "@/router/url";

export class ReservationService {
  private static readonly COLLECTION_NAME: string = "reservations";

  private static getCollection() {
    return firebase.firestore().collection(ReservationService.COLLECTION_NAME);
  }

  private static formatReservationTime(payload: Date): Date {
    return moment(payload).set({ year: 2020, month: 0, date: 1 }).toDate();
  }

  static cancel(id: string) {
    const transaction$ = firebase.firestore().runTransaction(async transaction => {
      const ref = ReservationService.getCollection().doc(id);
      const doc = await transaction.get(ref);

      if (!doc.exists) {
        return Promise.reject("Document does not exists");
      }

      transaction.delete(ref);
    });

    return transaction$;
  }

  static async entry(payload: Reservation): Promise<string> {
    if (!payload) {
      return Promise.reject({ message: "予約処理に失敗しました" });
    }

    // 選択した座席が予約済かどうか確認
    const reserved = await ReservationService.isReservedSeats(payload);

    if (reserved) {
      return Promise.reject({
        message: "選択した座席はすでに予約済です。お手数ですが再度選択してください。",
        refetch_seats: true
      });
    }

    const transaction$ = firebase.firestore().runTransaction(async transaction => {
      const doc = ReservationService.getCollection().doc();
      const timestamp = new Date();
      const seats: Array<number> = [];

      payload.reservation_seats.forEach(s => {
        if (s.is_selected) {
          seats.push(s.seat_no);
        }
      });

      const saveData: firebase.firestore.DocumentData = {
        reservation_date: payload.reservation_date,
        reservation_date_id: payload.reservation_date_id,
        reservation_start_time: payload.reservation_start_time,
        reservation_end_time: payload.reservation_end_time,
        reservation_time_id: payload.reservation_time_id,
        reserver_name: payload.reserver_name,
        number_of_reservations: payload.number_of_reservations,
        tel: payload.tel,
        mail: payload.mail,
        comment: payload.comment,
        redirect_url: location.origin.concat(RESERVATION_DETAIL_URL, `/${doc.id}`),
        seats: seats,
        created_at: timestamp,
        modified_at: timestamp
      };
      const ref = await transaction.get(doc);

      if (ref.exists) {
        return Promise.reject({ message: "予約データの作成に失敗しました。重複データです。" });
      }

      transaction.set(doc, saveData);

      return doc.id;
    });

    return transaction$;
  }

  static async edit(payload: Reservation): Promise<string> {
    if (!payload) {
      return Promise.reject({ message: "予約処理に失敗しました" });
    }

    // 選択した座席が予約済かどうか確認
    const reserved = await ReservationService.isReservedSeats(payload);

    if (reserved) {
      return Promise.reject({
        message: "選択した座席はすでに予約済です。お手数ですが再度選択してください。",
        refetch_seats: true
      });
    }

    const transaction$ = firebase.firestore().runTransaction(async transaction => {
      const doc = ReservationService.getCollection().doc(payload.id);
      const seats: Array<number> = [];

      payload.reservation_seats.forEach(s => {
        if (s.is_selected) {
          seats.push(s.seat_no);
        }
      });

      const saveData: firebase.firestore.DocumentData = {
        reservation_date: payload.reservation_date,
        reservation_date_id: payload.reservation_date_id,
        reservation_start_time: payload.reservation_start_time,
        reservation_end_time: payload.reservation_end_time,
        reservation_time_id: payload.reservation_time_id,
        reserver_name: payload.reserver_name,
        number_of_reservations: payload.number_of_reservations,
        tel: payload.tel,
        mail: payload.mail,
        comment: payload.comment,
        seats: seats,
        modified_at: new Date()
      };
      const ref = await transaction.get(doc);

      if (!ref.exists) {
        return Promise.reject({ message: "予約の変更に失敗しました。対象の予約データが見つかりませんでした。" });
      }

      transaction.update(doc, saveData);

      return doc.id;
    });

    return transaction$;
  }

  static async fetch(payload: ReservationSearchOption): Promise<Array<Reservation>> {
    let query = ReservationService.getCollection().where("reservation_date_id", "==", payload.reservation_date_id);

    if (payload.reservation_time_id !== "") {
      query = query.where("reservation_time_id", "==", payload.reservation_time_id);
    }

    const promise$ = await query.get();
    const items: Array<Reservation> = [];
    const reservationSeats: Array<ReservationSeat> = [];

    promise$.forEach(doc => {
      const data = doc.data();
      const reservationStartTime = ReservationService.formatReservationTime(data?.reservation_start_time.toDate());
      const reservationEndTime = ReservationService.formatReservationTime(data?.reservation_end_time.toDate());
      const emptySeats: Array<ReservationSeat> = times(4, n => {
        return {
          seat_no: n + 1,
          is_reserved: false,
          is_selected: false,
          reservation_date_id: "",
          reservation_time_id: ""
        } as ReservationSeat;
      });

      (data?.seats as Array<number>).forEach(s => {
        const item: Reservation = {
          id: doc.id,
          reservation_date: data?.reservation_date.toDate(),
          reservation_date_id: data?.reservation_date_id,
          reservation_start_time: reservationStartTime,
          reservation_end_time: reservationEndTime,
          reservation_time_id: data?.reservation_time_id,
          reserver_name: data?.reserver_name,
          reservation_seats: emptySeats,
          number_of_reservations: data?.number_of_reservations,
          tel: data?.tel,
          mail: data?.mail,
          comment: data?.comment
        };

        // 自身の予約座席データを更新
        item.reservation_seats.forEach(seat => {
          if (seat.seat_no === s) {
            seat.is_selected = true;
            seat.reservation_date_id = item.reservation_date_id;
            seat.reservation_id = item.id;
            seat.reservation_time_id = item.reservation_time_id;
          }
        });

        reservationSeats.push({
          seat_no: s,
          is_reserved: false,
          is_selected: false,
          reservation_date_id: item.reservation_date_id,
          reservation_id: item.id,
          reservation_time_id: item.reservation_time_id
        });

        items.push(item);
      });
    });

    // 同一予約日時の座席データをセット
    items.forEach(item => {
      item.reservation_seats.forEach(seat => {
       const data = reservationSeats.find(s => {
         return item.id !== s.reservation_id &&
           item.reservation_date_id === s.reservation_date_id &&
           item.reservation_time_id === s.reservation_time_id &&
           seat.seat_no === s.seat_no;
       }); 

       if (data) {
        seat.is_reserved = true;
        seat.reservation_date_id = data.reservation_date_id;
        seat.reservation_id = data.reservation_id;
        seat.reservation_time_id = data.reservation_time_id;
       }
      });
    });


    return orderBy(items, ["reservation_start_time", "reservation_end_time"], ["asc", "asc"]);
  }

  static fetchById(id: string) {
    return ReservationService.getCollection().doc(id).get();
  }

  static fetchSeats(payload: ReservationSearchOption) {
    return ReservationService.getCollection()
      .where("reservation_date_id", "==", payload.reservation_date_id)
      .where("reservation_time_id", "==", payload.reservation_time_id)
      .get();
  }

  static async isReservedSeats(payload: Reservation): Promise<boolean> {
    const selectedSeats: Array<number> = [];

    payload.reservation_seats.forEach(s => {
      if (s.is_selected) {
        selectedSeats.push(s.seat_no);
      }
    });

    const options: ReservationSearchOption = {
      reservation_date_id: payload.reservation_date_id,
      reservation_time_id: payload.reservation_time_id
    };
    const ref = await ReservationService.fetchSeats(options);
    let reserved = false;

    each(ref.docs, doc => {
      if (doc.id !== payload.id) {
        const seats = doc.data()?.seats as Array<number>;

        if (intersection(selectedSeats, seats).length > 0) {
          reserved = true;
          return false;
        }
      }
    });

    return reserved;
  }
}
