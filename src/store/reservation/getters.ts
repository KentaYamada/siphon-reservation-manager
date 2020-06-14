import { GetterTree } from "vuex";

// entity
import { ReservationSeat } from "@/entity/reservation-seat";

// plugin
import _ from "lodash";
import moment from "moment";

// store
import { RootState } from "@/store";
import {
  CAN_RESERVED,
  GET_RESERVABLE_PEOPLE,
  HAS_ITEMS,
  HAS_RESERVATION_SEATS,
  HAS_SELECTED_SEATS,
  IS_FULL_OF_RESERVED,
  VISIBLE_ACTIONS
} from "@/store/constant";
import { MAX_NUMBER_OF_RESERVATIONS, ReservationState } from "@/store/reservation";

const getters: GetterTree<ReservationState, RootState> = {
  /**
   * 予約可能人数取得
   * @param state
   * @returns number
   */
  [GET_RESERVABLE_PEOPLE]: (state: ReservationState): number => {
    if (!state.reservation) {
      return 0;
    }

    const seats = state.reservation.reservation_seats;
    const reservedSeats = _.filter(seats, (seat: ReservationSeat) => {
      return seat.is_reserved;
    }).length;
    const selectedSeats = _.filter(seats, (seat: ReservationSeat) => {
      return seat.is_selected;
    }).length;
    const total = reservedSeats * 2 + selectedSeats * 2;

    // 1テーブル2名席で計算
    if (MAX_NUMBER_OF_RESERVATIONS <= reservedSeats * 2) {
      return 0;
    }

    if (MAX_NUMBER_OF_RESERVATIONS <= total) {
      return 0;
    }

    return MAX_NUMBER_OF_RESERVATIONS - total;
  },

  /**
   * 予約データがあるかどうか
   * @param state
   * @returns boolean
   */
  [HAS_ITEMS]: (state: ReservationState): boolean => {
    return state.reservations.length > 0;
  },

  /**
   * 予約座席データがあるかどうか
   * @param state
   * @returns boolean
   */
  [HAS_RESERVATION_SEATS]: (state: ReservationState): boolean => {
    if (!state.reservation) {
      return false;
    }

    return state.reservation.reservation_seats.length > 0;
  },

  /**
   * 予約座席を選択したかどうか
   * @param state
   * @returns boolean
   */
  [HAS_SELECTED_SEATS]: (state: ReservationState): boolean => {
    if (!state.reservation) {
      return false;
    }

    const selectedSeats = _.filter(state.reservation.reservation_seats, (seat: ReservationSeat) => {
      return seat.is_selected;
    });

    return selectedSeats.length > 0;
  },

  /**
   * 予約キャンセル、変更ができるかどうか
   * @param state
   * @returns boolean
   */
  [VISIBLE_ACTIONS]: (state: ReservationState): boolean => {
    if (!state.reservation) {
      return false;
    }

    const current = moment();
    const reservationDate = moment(state.reservation.reservation_date as Date);
    reservationDate.set({ hour: 10, minutes: 1, second: 0, millisecond: 0 });

    return reservationDate.diff(current) > 0;
  },

  /**
   * 貸切予約ができるかどうか
   * @param state
   * @returns boolean
   */
  [CAN_RESERVED]: (state: ReservationState): boolean => {
    if (!state.reservation) {
      return false;
    }

    const count = _.filter(state.reservation.reservation_seats, (seat: ReservationSeat) => {
      return !seat.is_reserved;
    });

    return count.length === MAX_NUMBER_OF_RESERVATIONS / 2;
  },

  /**
   * 予約が満席かどうか
   * @param state
   * @returns boolean
   */
  [IS_FULL_OF_RESERVED]: (state: ReservationState): boolean => {
    if (!state.reservation) {
      return false;
    }

    const reservedSeats = _.filter(state.reservation.reservation_seats, (seat: ReservationSeat) => {
      return seat.is_reserved;
    });

    return reservedSeats.length >= MAX_NUMBER_OF_RESERVATIONS / 2;
  }
};

export default getters;
