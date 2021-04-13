import { orderBy, times } from "lodash";
import { ActionTree } from "vuex";
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import { ReservationService } from "@/services/firestore/reservation-service";
import { RootState } from "@/store";
import { MAX_NUMBER_OF_RESERVATIONS, ReservationState } from "@/store/reservation";
import {
  CANCEL,
  EDIT,
  ENTRY,
  FETCH_BY_ID,
  FETCH_RESERVATION_SEATS,
  SAVE,
  SET_ITEM,
  SET_RESERVATION_SEATS
} from "@/store/constant";

const actions: ActionTree<ReservationState, RootState> = {
  [EDIT]: ({ commit }, payload: Reservation) => {
    return ReservationService.edit(payload);
  },

  [ENTRY]: ({ commit }, payload: Reservation) => {
    return ReservationService.entry(payload);
  },

  [FETCH_RESERVATION_SEATS]: async ({ commit }, payload: ReservationSeatSearchOption) => {
    const docs = await ReservationService.fetchSeats(payload);

    let seats: Array<ReservationSeat> = [];

    docs.forEach(doc => {
      const data = doc.data();

      (data.seats as Array<number>).forEach(s => {
        const seat: ReservationSeat = {
          id: doc.id,
          seat_no: s,
          is_reserved: true,
          is_selected: false
        };

        seats.push(seat);
      });
    });

    // 空席データ作成
    let seatNo = seats.length;

    times(MAX_NUMBER_OF_RESERVATIONS / 2 - seats.length, () => {
      seatNo += 1;
      const seat: ReservationSeat = {
        id: "",
        seat_no: seatNo,
        is_reserved: false,
        is_selected: false
      };

      seats.push(seat);
    });

    seats = orderBy(seats, "seat_no", "asc");

    commit(SET_RESERVATION_SEATS, seats);
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

    let reservationSeats: Array<ReservationSeat> = [];

    reservationSeatsRef.forEach(doc => {
      const myReservation = doc.id === id;

      (doc.data().seats as Array<number>).forEach(s => {
        const seat: ReservationSeat = {
          id: doc.id,
          seat_no: s,
          is_reserved: !myReservation,
          is_selected: myReservation
        };
        reservationSeats.push(seat);
      });
    });

    reservationSeats = orderBy(reservationSeats, "seat_no", "asc");
    let seatNo = reservationSeats.length;

    // 空席を埋めていく
    const emptySeats = MAX_NUMBER_OF_RESERVATIONS / 2 - reservationSeats.length;
    times(emptySeats, () => {
      seatNo += 1;
      const seat: ReservationSeat = {
        id: "",
        seat_no: seatNo,
        is_reserved: false,
        is_selected: false
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

  [SAVE]: async ({ commit }, payload: Reservation) => {
    let promise$ = null;
    promise$ = ReservationService.entry(payload);

    return promise$;
  },

  [CANCEL]: async ({ commit }, id: string) => {
    return ReservationService.cancel(id);
  }
};

export default actions;
