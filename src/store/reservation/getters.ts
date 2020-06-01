import { GetterTree } from "vuex";

// entity
import { ReservationSeat } from "@/entity/reservation-seat";

// plugin
import _ from "lodash";

// store
import { RootState } from "@/store";
import {
  GET_RESERVABLE_PEOPLE,
  HAS_ITEMS,
  HAS_RESERVATION_SEATS
} from "@/store/constant";
import {
  MAX_NUMBER_OF_RESERVATIONS,
  ReservationState
} from "@/store/reservation";

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

  [HAS_RESERVATION_SEATS]: (state: ReservationState): boolean => {
    if (!state.reservation) {
      return false;
    }

    return state.reservation.reservation_seats.length > 0;
  }
};

export default getters;
