import { MutationTree } from "vuex";
import _ from "lodash";
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import {
  INITIALIZE_RESERVATION_SEATS,
  RESET_RESERVATION_SEATS,
  SET_ITEM,
  SET_ITEMS,
  SET_RESERVATION_SEAT,
  SET_RESERVATION_SEATS
} from "@/store/constant";
import { ReservationState, MAX_NUMBER_OF_RESERVATIONS } from "@/store/reservation";

const mutations: MutationTree<ReservationState> = {
  [INITIALIZE_RESERVATION_SEATS]: (state: ReservationState): void => {
    if (state.reservation) {
      state.reservation.reservation_seats = _.chain(_.range(MAX_NUMBER_OF_RESERVATIONS / 2))
        .map(no => {
          return {
            seat_no: no + 1,
            is_reserved: false,
            is_selected: false,
            reservation_id: "",
            reservation_date: null,
            reservation_date_id: "",
            reservation_start_time: null,
            reservation_end_time: null,
            reservation_time_id: ""
          } as ReservationSeat;
        })
        .value();
    }
  },

  [RESET_RESERVATION_SEATS]: (state: ReservationState): void => {
    if (state.reservation) {
      state.reservation.reservation_seats = [];
    }
  },

  [SET_ITEM]: (state: ReservationState, item: Reservation): void => {
    state.reservation = item;
  },

  [SET_ITEMS]: (state: ReservationState, items: Reservation[]): void => {
    state.reservations = items;
  },

  [SET_RESERVATION_SEAT]: (state: ReservationState, seat: ReservationSeat): void => {
    if (state.reservation && state.reservation.reservation_seats && state.reservation.reservation_seats.length > 0) {
      _.each(state.reservation.reservation_seats, (item: ReservationSeat) => {
        if (item.seat_no === seat.seat_no) {
          item.id = seat.id;
          item.is_reserved = seat.is_reserved;
          item.is_selected = seat.is_selected;
          item.reservation_id = seat.reservation_id;
          item.reservation_date = seat.reservation_date;
          item.reservation_date_id = seat.reservation_date_id;
          item.reservation_start_time = seat.reservation_start_time;
          item.reservation_end_time = seat.reservation_end_time;
          item.reservation_time_id = seat.reservation_time_id;
        }
      });
    }
  },

  [SET_RESERVATION_SEATS]: (state: ReservationState, seats: ReservationSeat[]): void => {
    if (state.reservation) {
      state.reservation.reservation_seats = seats;
    }
  }
};

export default mutations;
