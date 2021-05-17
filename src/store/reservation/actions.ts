import { includes, orderBy, times } from "lodash";
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
    const seats: Array<ReservationSeat> = [];

    times(MAX_NUMBER_OF_RESERVATIONS / 2, (n: number) => {
      seats.push({
        id: "",
        seat_no: n + 1,
        is_reserved: false,
        is_selected: false
      });
    });

    docs.forEach(doc => {
      const selectedSeats: Array<number> = doc.data()?.seats;
      seats.forEach(s => {
        if (includes(selectedSeats, s.seat_no)) {
          s.id = doc.id;
          s.is_reserved = true;
        }
      });
    });

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

    const reservationSeats: Array<ReservationSeat> = [];

    // 座席データ作成
    times(MAX_NUMBER_OF_RESERVATIONS / 2, (n: number) => {
      reservationSeats.push({
        id: "",
        seat_no: n + 1,
        is_reserved: false,
        is_selected: false
      });
    });

    reservationSeatsRef.forEach(doc => {
      const myReservation = doc.id === id;
      const selectedSeats: Array<number> = doc.data()?.seats;

      reservationSeats.forEach(seat => {
        if (includes(selectedSeats, seat.seat_no)) {
          seat.id = doc.id;
          seat.is_reserved = !myReservation;
          seat.is_selected = myReservation;
        }
      });
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
