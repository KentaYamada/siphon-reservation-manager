import { MutationTree } from "vuex";
import { BusinessDay } from "@/entity/business-day";
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import {
  INITIALIZE,
  SET_ITEM,
  SET_ITEMS,
  SET_RESERVATION_SEATS,
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

  [SET_RESERVATION_SEATS]: (state: ReservationState, seats: ReservationSeat[]): void => {
    if (state.reservation) {
      state.reservation.reservation_seats = seats;
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
