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

    if (!reservationSeatsRef.empty) {
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
    }
  },

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

  [SAVE]: async ({ commit }, reservation: Reservation) => {
    const service = new ReservationService();
    const promise = service.save(reservation);
    
    promise.then(() => commit(SET_ITEM, reservation));

    return promise;
  },

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
