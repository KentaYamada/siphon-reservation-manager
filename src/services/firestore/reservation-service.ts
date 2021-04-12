import _ from "lodash";
import { Reservation } from "@/entity/reservation";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import firebase from "@/plugins/firebase";
import { RESERVATION_DETAIL_URL } from "@/router/url";

export class ReservationService {
  private readonly COLLECTION_NAME: string = "reservations";

  private static getCollection() {
    return firebase.firestore().collection("reservations");
  }

  fetch(option: ReservationSearchOption) {
    if (_.isNil(option)) {
      return Promise.reject();
    }

    let query = firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .where("reservation_date_id", "==", option.reservation_date_id);

    if (!_.isEmpty(option.reservation_time_id)) {
      query = query.where("reservation_time_id", "==", option.reservation_time_id);
    }

    return query.get();
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
      console.log(saveData);
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

    _.each(ref.docs, doc => {
      if (doc.id !== payload.id) {
        const seats = doc.data()?.seats as Array<number>;

        if (_.intersection(selectedSeats, seats).length > 0) {
          reserved = true;
          return false;
        }
      }
    });

    return reserved;
  }
}
