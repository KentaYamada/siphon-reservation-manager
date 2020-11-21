import _ from "lodash";
import { from, throwError, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Reservation } from "@/entity/reservation";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeat } from "@/entity/reservation-seat";
import firebase from "@/plugins/firebase";

export class ReservationService {
  private readonly COLLECTION_NAME: string = "reservations";
  private readonly SUB_COLLECTION_NAME: string = "reservation_seats";

  private static _getCollection() {
    return firebase.firestore().collection("reservations");
  }

  async save(reservation: Reservation) {
    if (_.isNil(reservation)) {
      return Promise.reject({
        message: "予約処理に失敗しました"
      });
    }

    const hasReserved = await this._existReservedSeats(reservation);
    if (hasReserved) {
      return Promise.reject({
        message: "選択した座席はすでに予約済です。お手数ですが再度選択してください。",
        refetch_seats: true
      });
    }

    const db = firebase.firestore();
    const transaction = db.runTransaction(async transaction => {
      const reservationsRef = db.collection(this.COLLECTION_NAME);
      const reservationRef = reservation.id ? reservationsRef.doc(reservation.id) : reservationsRef.doc();
      const existData = await transaction.get(reservationRef);
      const reservationData: firebase.firestore.DocumentData = {
        reservation_date: reservation.reservation_date,
        reservation_date_id: reservation.reservation_date_id,
        reservation_start_time: reservation.reservation_start_time,
        reservation_end_time: reservation.reservation_end_time,
        reservation_time_id: reservation.reservation_time_id,
        reserver_name: reservation.reserver_name,
        number_of_reservations: reservation.number_of_reservations,
        tel: reservation.tel,
        mail: reservation.mail,
        comment: reservation.comment
      };

      if (existData.exists) {
        transaction.update(reservationRef, reservationData);

        const reservedSeatsRef = await db
          .collection(this.SUB_COLLECTION_NAME)
          .where("reservation_id", "==", reservationRef.id)
          .get();
        reservedSeatsRef.forEach(doc => {
          transaction.update(doc.ref, { reservation_id: null, is_reserved: false });
        });
      } else {
        transaction.set(reservationRef, reservationData);
      }

      const reservationSeatsRef = await db
        .collection(this.SUB_COLLECTION_NAME)
        .where("reservation_date", "==", reservation.reservation_date)
        .where("reservation_time_id", "==", reservation.reservation_time_id)
        .get();

      if (reservationSeatsRef.empty) {
        _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
          const reservationSeatRef = db.collection(this.SUB_COLLECTION_NAME).doc();
          const seatData: firebase.firestore.DocumentData = {
            seat_no: seat.seat_no,
            is_reserved: false,
            reservation_id: null,
            reservation_date: reservation.reservation_date,
            reservation_date_id: reservation.reservation_date_id,
            reservation_start_time: reservation.reservation_start_time,
            reservation_end_time: reservation.reservation_end_time,
            reservation_time_id: reservation.reservation_time_id
          };

          if (seat.is_selected) {
            seatData.reservation_id = reservationRef.id;
            seatData.is_reserved = true;
          }

          transaction.set(reservationSeatRef, seatData);
        });
      } else {
        _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
          const seatRef = _.find(reservationSeatsRef.docs, doc => {
            return seat.seat_no === doc.data()?.seat_no;
          });

          if (_.isNil(seatRef)) {
            return Promise.reject();
          }

          const seatData: firebase.firestore.DocumentData = {
            seat_no: seat.seat_no,
            reservation_date: reservation.reservation_date,
            reservation_date_id: reservation.reservation_date_id,
            reservation_time_id: reservation.reservation_time_id,
            reservation_start_time: reservation.reservation_start_time,
            reservation_end_time: reservation.reservation_end_time
          };

          if (_.isEmpty(seatRef.data().reservation_id) && seat.is_selected) {
            // 予約座席を追加
            seatData.reservation_id = reservationRef.id;
            seatData.is_reserved = true;
          }

          if (seatRef.data()?.reservation_id === reservationRef.id) {
            // 自身の予約座席
            seatData.is_reserved = seat.is_selected;
            seatData.reservation_id = seat.is_selected ? seat.reservation_id : null;
          }

          transaction.update(seatRef.ref, seatData);
        });
      }

      return reservationRef.id;
    });

    return transaction;
  }

  static cancel(id: string): Observable<void> {
    if(!id) {
      throwError("不正なリクエストです。");
    }

    const docRef = ReservationService._getCollection().doc(id);

    return from(docRef.delete());
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

  static fetchById(id: string): Observable<Reservation> {
    if (!id) {
      throwError("不正なリクエストです");
    }
    const docRef = ReservationService._getCollection().doc(id);

    return from(docRef.get()).pipe(
      map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          reservation_date: data?.reservation_date?.toDate(),
          reservation_date_id: data?.reservation_date_id,
          reservation_end_time: data?.reservation_end_time.toDate(),
          reservation_start_time: data?.reservation_end_time.toDate(),
          reservation_time_id: data?.reservation_time_id,
          reserver_name: data?.reserver_name,
          number_of_reservations: data?.number_of_reservations,
          tel: data?.tel,
          mail: data?.mail,
          comment: data?.comment,
          reservation_seats: []
        } as Reservation;
      })
    );
  }

  private async _existReservedSeats(reservation: Reservation): Promise<boolean> {
    const selectedSeatNo: Array<number> = [];

    _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
      if (seat.is_selected) {
        selectedSeatNo.push(seat.seat_no);
      }
    });

    const reservationSeatsRef = await firebase
      .firestore()
      .collection(this.SUB_COLLECTION_NAME)
      .where("reservation_date_id", "==", reservation.reservation_date_id)
      .where("reservation_time_id", "==", reservation.reservation_time_id)
      .where("is_reserved", "==", true)
      .get();

    let hasReserved = false;
    _.each(reservationSeatsRef.docs, doc => {
      if (doc.data()?.reservation_id !== reservation.id && _.includes(selectedSeatNo, doc.data()?.seat_no)) {
        hasReserved = true;
        return false;
      }
    });

    return hasReserved;
  }
}
