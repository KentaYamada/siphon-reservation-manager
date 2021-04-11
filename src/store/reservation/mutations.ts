import { MutationTree } from "vuex";
import _ from "lodash";
import { BusinessDay } from "@/entity/business-day";
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import {
  INITIALIZE,
  RESET_RESERVATION_TIMEZONE,
  SET_ITEM,
  SET_ITEMS,
  SET_RESERVATION_SEAT,
  SET_RESERVATION_SEATS,
  SET_RESERVATION_TIMEZONE,
  UPDATE_COMMENT,
  UPDATE_MAIL,
  UPDATE_NUMBER_OF_RESERVATIONS,
  UPDATE_RESERVATION_DATE,
  UPDATE_RESERVATION_SEAT,
  UPDATE_RESERVATION_TIME,
  UPDATE_RESERVER_NAME,
  UPDATE_TEL
} from "@/store/constant";
import { ReservationState } from "@/store/reservation";

const mutations: MutationTree<ReservationState> = {
  [INITIALIZE]: (state: ReservationState): void => {
    state.reservation = {
      id: "",
      reservation_date: null,
      reservation_date_id: "",
      reservation_start_time: null,
      reservation_end_time: null,
      reservation_time_id: "",
      reservation_seats: [],
      reserver_name: "",
      number_of_reservations: 0,
      mail: "",
      tel: "",
      comment: ""
    };
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
  },

  [SET_RESERVATION_TIMEZONE]: (state: ReservationState, timezone: SelectableTimezone): void => {
    if (state.reservation) {
      state.reservation.reservation_start_time = timezone.start_time;
      state.reservation.reservation_end_time = timezone.end_time;
    }
  },

  [RESET_RESERVATION_TIMEZONE]: (state: ReservationState): void => {
    if (state.reservation) {
      state.reservation.reservation_start_time = null;
      state.reservation.reservation_end_time = null;
      state.reservation.reservation_time_id = "";
    }
  },

  [UPDATE_COMMENT]: (state: ReservationState, payload: string): void => {
    state.reservation.comment = payload;
  },

  [UPDATE_NUMBER_OF_RESERVATIONS]: (state: ReservationState, payload: number): void => {
    state.reservation.number_of_reservations = payload;
  },

  [UPDATE_MAIL]: (state: ReservationState, payload: string): void => {
    state.reservation.mail = payload;
  },

  [UPDATE_RESERVATION_DATE]: (state: ReservationState, payload: BusinessDay): void => {
    state.reservation.reservation_date_id = payload.id as string;
    state.reservation.reservation_date = payload.business_date;
    state.reservation.reservation_time_id = "";
    state.reservation.reservation_start_time = null;
    state.reservation.reservation_end_time = null;
    state.reservation.reservation_seats = [];
  },

  [UPDATE_RESERVATION_SEAT]: (state: ReservationState, payload: number): void => {
    state.reservation.reservation_seats.forEach(s => {
      if (s.seat_no === payload) {
        s.is_selected = !s.is_selected;
      }
    });
  },

  [UPDATE_RESERVATION_TIME]: (state: ReservationState, payload: SelectableTimezone): void => {
    state.reservation.reservation_time_id = payload.id as string;
    state.reservation.reservation_start_time = payload.start_time;
    state.reservation.reservation_end_time = payload.end_time;
    state.reservation.reservation_seats = [];
  },

  [UPDATE_RESERVER_NAME]: (state: ReservationState, payload: string): void => {
    state.reservation.reserver_name = payload;
  },

  [UPDATE_TEL]: (state: ReservationState, payload: string): void => {
    state.reservation.tel = payload;
  }
};

export default mutations;
