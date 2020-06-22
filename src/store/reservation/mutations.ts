import { MutationTree } from "vuex";

// entity
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import { Timezone } from "@/entity/timezone";

// plugin
import _ from "lodash";

// store
import {
  INITIALIZE,
  INITIALIZE_RESERVATION_SEATS,
  RESET_RESERVATION_SEATS,
  RESET_RESERVATION_TIMEZONE,
  SET_ITEM,
  SET_ITEMS,
  SET_RESERVATION_DATE,
  SET_RESERVATION_SEAT,
  SET_RESERVATION_SEATS,
  SET_RESERVATION_TIMEZONE
} from "@/store/constant";
import { ReservationState } from "@/store/reservation";

const mutations: MutationTree<ReservationState> = {
  /**
   * 予約データ初期化
   * @param state
   */
  [INITIALIZE]: (state: ReservationState): void => {
    const reservation: Reservation = {
      reservation_date: null,
      reservation_date_id: "",
      reservation_start_time: null,
      reservation_end_time: null,
      reservation_time_id: "",
      reserver_name: "",
      reservation_seats: [],
      number_of_reservations: null,
      tel: "",
      mail: "",
      comment: ""
    };

    state.reservation = reservation;
  },

  [INITIALIZE_RESERVATION_SEATS]: (state: ReservationState): void => {
    if (state.reservation) {
      // const seatNo = [1, 2, 3, 4, 5];
      const seatNo = [1, 2, 3, 4];
      const items: ReservationSeat[] = [];

      _.each(seatNo, (no: number) => {
        const item: ReservationSeat = {
          seat_no: no,
          is_reserved: false,
          is_selected: false,
          reservation_id: "",
          reservation_date: null,
          reservation_date_id: "",
          reservation_start_time: null,
          reservation_end_time: null,
          reservation_time_id: ""
        };

        items.push(item);
      });

      state.reservation.reservation_seats = items;
    }
  },

  [RESET_RESERVATION_SEATS]: (state: ReservationState): void => {
    if (state.reservation) {
      state.reservation.reservation_seats = [];
    }
  },

  /**
   * 予約データセット
   * @param state
   * @param item
   */
  [SET_ITEM]: (state: ReservationState, item: Reservation): void => {
    state.reservation = item;
  },

  /**
   * 予約一覧データセット
   * @param state
   * @param items
   */
  [SET_ITEMS]: (state: ReservationState, items: Reservation[]): void => {
    state.reservations = items;
  },

  /**
   * 予約日更新
   */
  [SET_RESERVATION_DATE]: (state: ReservationState, businessDay: Date): void => {
    if (state.reservation) {
      state.reservation.reservation_date = businessDay;
    }
  },

  /**
   * 予約座席更新
   * @param state
   * @param seat
   */
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

  /**
   * 予約座席更新
   * @param state
   * @param seat
   */
  [SET_RESERVATION_SEATS]: (state: ReservationState, seats: ReservationSeat[]): void => {
    if (state.reservation) {
      state.reservation.reservation_seats = seats;
    }
  },

  /**
   * 予約時間帯更新
   */
  [SET_RESERVATION_TIMEZONE]: (state: ReservationState, timezone: Timezone): void => {
    if (state.reservation) {
      state.reservation.reservation_start_time = timezone.start_time;
      state.reservation.reservation_end_time = timezone.end_time;
    }
  },

  /**
   * 予約時間帯リセット
   */
  [RESET_RESERVATION_TIMEZONE]: (state: ReservationState): void => {
    if (state.reservation) {
      state.reservation.reservation_start_time = null;
      state.reservation.reservation_end_time = null;
      state.reservation.reservation_time_id = "";
    }
  }
};

export default mutations;
