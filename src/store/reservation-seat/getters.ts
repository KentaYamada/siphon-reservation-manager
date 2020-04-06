import { GetterTree } from "vuex";

// entity
import { ReservationSeat } from "@/entity/reservation-seat";

// plugin
import _ from "lodash";

// store
import { RootState } from "@/store";
import { GET_RESERVABLE_PEOPLE } from "@/store/constant";
import {
  ReservationSeatState,
  MAX_NUMBER_OF_RESERVATIONS
} from "@/store/reservation-seat";

const getters: GetterTree<ReservationSeatState, RootState> = {
  /**
   * 予約可能人数取得
   * @param state
   * @returns number
   */
  [GET_RESERVABLE_PEOPLE]: (state: ReservationSeatState): number => {
    if (!state.reservationSeats) {
      return 0;
    }

    const reservedSeats = _.filter(
      state.reservationSeats,
      (seat: ReservationSeat) => {
        return seat.is_reserved;
      }
    ).length;
    const selectedSeats = _.filter(
      state.reservationSeats,
      (seat: ReservationSeat) => {
        return seat.is_selected;
      }
    ).length;
    const total = reservedSeats + selectedSeats;

    // 1テーブル2名席で計算
    if (MAX_NUMBER_OF_RESERVATIONS <= reservedSeats * 2) {
      return 0;
    }

    if (MAX_NUMBER_OF_RESERVATIONS <= total) {
      return 0;
    }

    return MAX_NUMBER_OF_RESERVATIONS - total;
  }
};

export default getters;
