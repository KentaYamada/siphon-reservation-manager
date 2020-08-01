import { ActionTree } from "vuex";
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import _ from "lodash";
import firebase from "@/plugins/firebase";
import { ReservationService } from "@/services/firestore/reservation-service";
import { ReservationSeatService } from "@/services/firestore/reservation-seat-service";
import { RootState } from "@/store";
import { ReservationState } from "@/store/reservation";
import {
  CANCEL,
  FETCH,
  FETCH_BY_ID,
  FETCH_RESERVATION_SEATS,
  SAVE,
  SAVE_ALL_RESERVATION,
  SET_ITEM,
  SET_ITEMS,
  SET_RESERVATION_SEATS
} from "@/store/constant";

// firestore collection name
const COLLECTION_NAME = "reservations";
const RESERVATION_SEATS_COLLECTION = "reservation_seats";

const actions: ActionTree<ReservationState, RootState> = {
  [FETCH]: async ({ commit }, option: ReservationSearchOption) => {
    const reservationService = new ReservationService();
    const reservationRef = await reservationService.fetch(option);
    const reservations: Array<Reservation> = _.chain(reservationRef.docs)
      .map(doc => {
        return {
          id: doc.id,
          reservation_date: doc.data()?.reservation_date.toDate(),
          reservation_date_id: doc.data()?.reservation_date_id,
          reservation_start_time: doc.data()?.reservation_start_time.toDate(),
          reservation_end_time: doc.data()?.reservation_end_time.toDate(),
          reservation_time_id: doc.data()?.reservation_time_id,
          reserver_name: doc.data()?.reserver_name,
          reservation_seats: [],
          number_of_reservations: doc.data()?.number_of_reservations,
          tel: doc.data()?.tel,
          mail: doc.data()?.mail,
          comment: doc.data()?.comment
        } as Reservation;
      })
      .orderBy("reservation_date_id", "asc")
      .value();

    const reservationSeatService = new ReservationSeatService();
    const reservationSeatRef = await reservationSeatService.fetch(option);
    const seats: Array<ReservationSeat> = _.chain(reservationSeatRef.docs)
      .map(doc => {
        return {
          id: doc.id,
          seat_no: doc.data()?.seat_no,
          is_reserved: doc.data()?.is_reserved,
          is_selected: false,
          reservation_id: doc.data()?.reservation_id,
          reservation_date: doc.data()?.reservation_date.toDate(),
          reservation_date_id: doc.data()?.reservation_date_id,
          reservation_start_time: doc.data()?.reservation_start_time.toDate(),
          reservation_end_time: doc.data()?.reservation_end_time.toDate(),
          reservation_time_id: doc.data()?.reservation_time_id
        } as ReservationSeat;
      })
      .orderBy("seat_no", "asc")
      .value();

    _.each(reservations, (item: Reservation) => {
      item.reservation_seats = _.chain(seats)
        .cloneDeep()
        .filter((seat: ReservationSeat) => {
          return (
            item.reservation_date_id === seat.reservation_date_id &&
            item.reservation_time_id === seat.reservation_time_id
          );
        })
        .each((seat: ReservationSeat) => {
          const isMyReservation = item.id === seat.reservation_id;
          seat.is_reserved = !isMyReservation && seat.is_reserved;
          seat.is_selected = isMyReservation && seat.is_reserved;
        })
        .value();
    });

    commit(SET_ITEMS, reservations);

    return Promise.all([reservationSeatRef, reservationSeatRef]);
  },

  [FETCH_RESERVATION_SEATS]: async ({ commit }, searchOption: ReservationSeatSearchOption) => {
    const reservationSeatService = new ReservationSeatService();
    const reservationSeatsRef = await reservationSeatService.fetch(searchOption);

    if (reservationSeatsRef.empty) {
      return Promise.reject();
    }

    const seats: Array<ReservationSeat> = _.chain(reservationSeatsRef.docs)
      .map(doc => {
        const isMyReservation = searchOption.reservation_id === doc.data()?.reservation_id;
        return {
          id: doc.id,
          seat_no: doc.data()?.seat_no,
          is_reserved: !isMyReservation && doc.data()?.is_reserved,
          is_selected: isMyReservation && doc.data()?.is_reserved,
          reservation_id: doc.data()?.reservation_id,
          reservation_date: doc.data()?.reservation_date.toDate(),
          reservation_date_id: doc.data()?.reservation_date_id,
          reservation_start_time: doc.data()?.reservation_start_time.toDate(),
          reservation_end_time: doc.data()?.reservation_end_time.toDate(),
          reservation_time_id: doc.data()?.reservation_time_id
        } as ReservationSeat;
      })
      .orderBy("seat_no", "asc")
      .value();

    commit(SET_RESERVATION_SEATS, seats);
  },

  /**
   * 予約情報取得
   * @param id
   */
  [FETCH_BY_ID]: async ({ commit }, id: string) => {
    const reservationService = new ReservationService();
    const reservationRef = await reservationService.fetchById(id);

    if (!reservationRef.exists || _.isNil(reservationRef.data())) {
      Promise.reject();
    }

    const searchOption: ReservationSearchOption = {
      reservation_date_id: reservationRef.data()?.reservation_date_id,
      reservation_time_id: reservationRef.data()?.reservation_time_id
    };
    const reservationSeatService = new ReservationSeatService();
    const reservationSeatsRef = await reservationSeatService.fetch(searchOption);

    if (reservationSeatsRef.empty) {
      return Promise.reject();
    }

    const seats: Array<ReservationSeat> = _.chain(reservationSeatsRef.docs)
      .map(doc => {
        const isMyReservation = id === doc.data()?.reservation_id;
        return {
          id: doc.id,
          seat_no: doc.data()?.seat_no,
          is_reserved: !isMyReservation && doc.data()?.is_reserved,
          is_selected: isMyReservation && doc.data()?.is_reserved,
          reservation_id: doc.data()?.reservation_id,
          reservation_date: doc.data()?.reservation_date.toDate(),
          reservation_date_id: doc.data()?.reservation_date_id,
          reservation_start_time: doc.data()?.reservation_start_time.toDate(),
          reservation_end_time: doc.data()?.reservation_end_time.toDate(),
          reservation_time_id: doc.data()?.reservation_time_id
        } as ReservationSeat;
      })
      .orderBy("seat_no", "asc")
      .value();
    const reservation: Reservation = {
      id: id,
      reservation_date: reservationRef.data()?.reservation_date.toDate(),
      reservation_date_id: reservationRef.data()?.reservation_date_id,
      reservation_start_time: reservationRef.data()?.reservation_start_time.toDate(),
      reservation_end_time: reservationRef.data()?.reservation_end_time.toDate(),
      reservation_time_id: reservationRef.data()?.reservation_time_id,
      reserver_name: reservationRef.data()?.reserver_name,
      reservation_seats: seats,
      number_of_reservations: reservationRef.data()?.number_of_reservations,
      tel: reservationRef.data()?.tel,
      mail: reservationRef.data()?.mail,
      comment: reservationRef.data()?.comment
    };

    commit(SET_ITEM, reservation);

    return Promise.all([reservationRef, reservationSeatsRef]);
  },

  /**
   * 予約登録
   * @param reservation
   */
  [SAVE]: async ({ commit }, reservation: Reservation) => {
    const selectedSeatNo: number[] = [];

    _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
      if (seat.is_selected) {
        selectedSeatNo.push(seat.seat_no);
      }
    });

    const db = firebase.firestore();
    const reservationSeats = db.collection(RESERVATION_SEATS_COLLECTION);
    const query = reservationSeats
      .where("reservation_date_id", "==", reservation.reservation_date_id)
      .where("reservation_time_id", "==", reservation.reservation_time_id)
      .where("is_reserved", "==", true);
    const $promise = await query.get();
    let hasReserved = false;

    _.each($promise.docs, doc => {
      if (doc.data().reservation_id !== reservation.id && _.includes(selectedSeatNo, doc.data().seat_no)) {
        hasReserved = true;
        return false;
      }
    });

    if (hasReserved) {
      return Promise.reject({
        message: "選択した座席は予約されています。お手数ですが再選択してください。",
        refetch_seats: true
      });
    }

    const $transaction = db.runTransaction(async transaction => {
      const reservations = db.collection(COLLECTION_NAME);
      const reservationRef = reservation.id ? reservations.doc(reservation.id) : reservations.doc();
      const reservationData = {
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
      const $hasReservation = await transaction.get(reservationRef);

      if ($hasReservation.exists) {
        const reservedSeats = await reservationSeats.where("reservation_id", "==", reservation.id).get();
        reservedSeats.forEach(doc => {
          transaction.update(doc.ref, { reservation_id: null, is_reserved: false });
        });
        transaction.update(reservationRef, reservationData);
      } else {
        transaction.set(reservationRef, reservationData);
      }

      const query = reservationSeats
        .where("reservation_date", "==", reservation.reservation_date)
        .where("reservation_time_id", "==", reservation.reservation_time_id);
      const $reservationSeats = await query.get();

      $reservationSeats.forEach(doc => transaction.delete(doc.ref));

      _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
        const seatRef = reservationSeats.doc();
        let reservationId = null;
        let isReserved = null;

        if (seat.is_reserved) {
          reservationId = seat.reservation_id;
          isReserved = seat.is_reserved;
        } else {
          if (seat.is_selected) {
            reservationId = seat.reservation_id ? seat.reservation_id : reservationRef.id;
            isReserved = true;
          }
        }

        const seatData = {
          seat_no: seat.seat_no,
          is_reserved: isReserved,
          reservation_id: reservationId,
          reservation_date: reservation.reservation_date,
          reservation_date_id: reservation.reservation_date_id,
          reservation_start_time: reservation.reservation_start_time,
          reservation_end_time: reservation.reservation_end_time,
          reservation_time_id: reservation.reservation_time_id
        };

        transaction.set(seatRef, seatData);
      });

      return reservationRef.id;
    });

    return $transaction;
  },

  /**
   * 貸切データ登録
   */
  [SAVE_ALL_RESERVATION]: async ({ commit }, reservation: Reservation): Promise<string> => {
    const db = firebase.firestore();
    const $transaction = db.runTransaction(async transaction => {
      const reservationSeats = db.collection(RESERVATION_SEATS_COLLECTION);
      const query = reservationSeats
        .where("reservation_date_id", "==", reservation.reservation_date_id)
        .where("reservation_time_id", "==", reservation.reservation_time_id);
      const $promise = await query.get();

      if (!$promise.empty) {
        return Promise.reject();
      }

      const reservationRef = db.collection(COLLECTION_NAME).doc();
      const reservationData = {
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

      transaction.set(reservationRef, reservationData);

      _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
        const reservationSeatRef = reservationSeats.doc();
        const seatData = {
          seat_no: seat.seat_no,
          is_reserved: true,
          reservation_id: reservationRef.id,
          reservation_date: reservation.reservation_date,
          reservation_date_id: reservation.reservation_date_id,
          reservation_start_time: reservation.reservation_start_time,
          reservation_end_time: reservation.reservation_end_time,
          reservation_time_id: reservation.reservation_time_id
        };

        transaction.set(reservationSeatRef, seatData);
      });

      return reservationRef.id;
    });

    return $transaction;
  },

  /**
   * 予約取消
   * @param id
   */
  [CANCEL]: async ({ commit }, id: string) => {
    if (!id) {
      return Promise.reject("not found");
    }
    const db = firebase.firestore();
    const $transaction = db.runTransaction(async transaction => {
      const reservationRef = db.collection(COLLECTION_NAME).doc(id);

      return await transaction.get(reservationRef).then(doc => {
        if (!doc.exists) {
          return Promise.reject("reservation not found");
        }

        transaction.delete(reservationRef);

        const query = db.collection(RESERVATION_SEATS_COLLECTION).where("reservation_id", "==", id);

        return query.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const updateData = {
              is_reserved: false,
              reservation_id: null
            };
            transaction.update(doc.ref, updateData);
          });
        });
      });
    });

    return await $transaction;
  }
};

export default actions;
