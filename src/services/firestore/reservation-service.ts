import _ from "lodash";
import { Reservation } from "@/entity/reservation";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeat } from "@/entity/reservation-seat";
import firebase from "@/plugins/firebase";

export class ReservationService {
  private readonly COLLECTION_NAME: string = "reservations";
  private readonly SUB_COLLECTION_NAME: string = "reservation_seats";

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
      // todo: type safe
      const reservationData: any = {
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
          // todo: type safe
          const seatData: any = {
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

          // todo: type safe
          const seatData: any = {};

          if (_.isEmpty(seatRef.data().reservation_id) && seat.is_selected) {
            seatData.reservation_id = reservationRef.id;
            seatData.is_reserved = true;
            seatData.reservation_date = reservation.reservation_date;
            seatData.reservation_date_id = reservation.reservation_date_id;
            seatData.reservation_time_id = reservation.reservation_time_id;
            seatData.reservation_start_time = reservation.reservation_start_time;
            seatData.reservation_end_time = reservation.reservation_end_time;
          }

          const isMyReservation = seatRef.data()?.reservation_id === reservationRef.id;

          if (isMyReservation && !seat.is_selected) {
            seatData.is_reserved = false;
            seatData.reservation_id = null;
          }

          transaction.update(seatRef.ref, seatData);
        });
      }

      return reservationRef.id;
    });

    return transaction;
  }

  // いるかも
  async saveAllReservation(reservation: Reservation) {
    return Promise.resolve("future implementation");
    // vuex からロジックうつしておく
    // const db = firebase.firestore();
    // const $transaction = db.runTransaction(async transaction => {
    //   const reservationSeats = db.collection(RESERVATION_SEATS_COLLECTION);
    //   const query = reservationSeats
    //     .where("reservation_date_id", "==", reservation.reservation_date_id)
    //     .where("reservation_time_id", "==", reservation.reservation_time_id);
    //   const $promise = await query.get();

    //   if (!$promise.empty) {
    //     return Promise.reject();
    //   }

    //   const reservationRef = db.collection(COLLECTION_NAME).doc();
    //   const reservationData = {
    //     reservation_date: reservation.reservation_date,
    //     reservation_date_id: reservation.reservation_date_id,
    //     reservation_start_time: reservation.reservation_start_time,
    //     reservation_end_time: reservation.reservation_end_time,
    //     reservation_time_id: reservation.reservation_time_id,
    //     reserver_name: reservation.reserver_name,
    //     number_of_reservations: reservation.number_of_reservations,
    //     tel: reservation.tel,
    //     mail: reservation.mail,
    //     comment: reservation.comment
    //   };

    //   transaction.set(reservationRef, reservationData);

    //   _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
    //     const reservationSeatRef = reservationSeats.doc();
    //     const seatData = {
    //       seat_no: seat.seat_no,
    //       is_reserved: true,
    //       reservation_id: reservationRef.id,
    //       reservation_date: reservation.reservation_date,
    //       reservation_date_id: reservation.reservation_date_id,
    //       reservation_start_time: reservation.reservation_start_time,
    //       reservation_end_time: reservation.reservation_end_time,
    //       reservation_time_id: reservation.reservation_time_id
    //     };

    //     transaction.set(reservationSeatRef, seatData);
    //   });

    //   return reservationRef.id;
    // });

    // return $transaction;
  }

  async cancel(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject("Invalid argument: id");
    }

    const db = firebase.firestore();
    const transaction = db.runTransaction(async transaction => {
      const reservationRef = db.collection(this.COLLECTION_NAME).doc(id);
      const existData = await transaction.get(reservationRef);

      if (!existData.exists) {
        return Promise.reject("Reservation not found");
      }

      const reservationSeatsRef = await db.collection(this.SUB_COLLECTION_NAME).where("reservation_id", "==", id).get();

      reservationSeatsRef.forEach(doc => {
        transaction.update(doc.ref, {
          is_reserved: false,
          reservation_id: null
        });
      });

      transaction.delete(reservationRef);
    });

    return transaction;
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

  fetchById(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject();
    }

    return firebase.firestore().collection(this.COLLECTION_NAME).doc(id).get();
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
