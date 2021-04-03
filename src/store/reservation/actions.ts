import { ActionTree } from "vuex";
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import _ from "lodash";
import { ReservationService } from "@/services/firestore/reservation-service";
import { ReservationSeatService } from "@/services/firestore/reservation-seat-service";
import { RootState } from "@/store";
import { MAX_NUMBER_OF_RESERVATIONS, ReservationState } from "@/store/reservation";
import {
  CANCEL,
  FETCH_BY_ID,
  FETCH_RESERVATION_SEATS,
  SAVE,
  SET_ITEM,
  SET_RESERVATION_SEATS
} from "@/store/constant";

const actions: ActionTree<ReservationState, RootState> = {
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
    const reservationRef = await ReservationService.fetchById(id);

    if (!reservationRef.exists) {
      return Promise.reject();
    }

    const searchOption: ReservationSearchOption = {
      reservation_date_id: reservationRef.data()?.reservation_date_id,
      reservation_time_id: reservationRef.data()?.reservation_time_id
    };
    const reservationSeatsRef = await ReservationService.fetchSeats(searchOption);

    if (reservationSeatsRef.empty) {
      return Promise.reject();
    }

    let seatNo = 0;
    let reservationSeats: Array<ReservationSeat> = [];

    reservationSeatsRef.forEach(doc => {
      const myReservation = doc.id === id;

      (doc.data().seats as Array<number>).forEach(s => {
        const seat: ReservationSeat = {
          id: doc.id,
          seat_no: s,
          is_reserved: !myReservation,
          is_selected: myReservation,
          reservation_id: doc.id,
          reservation_date: doc.data().reservation_date_id,
          reservation_date_id: doc.data()?.reservation_date_id,
          reservation_start_time: doc.data()?.reservation_start_time.toDate(),
          reservation_end_time: doc.data()?.reservation_end_time.toDate(),
          reservation_time_id: doc.data()?.reservation_time_id
        };
        reservationSeats.push(seat);
        seatNo = s;
      })
    });

    reservationSeats = _.orderBy(reservationSeats, "seat_no", "asc");

    // 空席を埋めていく
    const emptySeats = (MAX_NUMBER_OF_RESERVATIONS / 2) - reservationSeats.length;
    _.times(emptySeats, () => {
        seatNo += 1;
        const seat: ReservationSeat = {
          id: "",
          seat_no: seatNo,
          is_reserved: false,
          is_selected: false,
          reservation_id: "",
          reservation_date: null,
          reservation_date_id: "",
          reservation_start_time: null,
          reservation_end_time: null,
          reservation_time_id: ""
        };

        reservationSeats.push(seat);
    });

    const reservation: Reservation = {
      id: id,
      reservation_date: reservationRef.data()?.reservation_date.toDate(),
      reservation_date_id: reservationRef.data()?.reservation_date_id,
      reservation_start_time: reservationRef.data()?.reservation_start_time.toDate(),
      reservation_end_time: reservationRef.data()?.reservation_end_time.toDate(),
      reservation_time_id: reservationRef.data()?.reservation_time_id,
      reserver_name: reservationRef.data()?.reserver_name,
      reservation_seats: reservationSeats,
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

  [CANCEL]: async ({ commit }, id: string) => {
    const service = new ReservationService();
    return service.cancel(id);
  }
};

export default actions;
