import _ from "lodash";
import { GetterTree } from "vuex";
import { ReservationSeat } from "@/entity/reservation-seat";
import { RootState } from "@/store";
import { GET_RESERVABLE_PEOPLE, HAS_ITEMS } from "@/store/constant";
import {
  ReservationState,
  MAX_NUMBER_OF_RESERVATIONS
} from "@/store/reservation";

const getters: GetterTree<ReservationState, RootState> = {
  /**
   * 予約可能人数取得
   * @param state
   * @returns number
   */
  [GET_RESERVABLE_PEOPLE]: (state: ReservationState): number => {
    const reservedSeats = _.filter(
      state.reservation?.reservation_seats,
      (seat: ReservationSeat) => {
        return seat.is_reserved;
      }
    );

    // 1テーブル2名で計算
    const reservedPeople = reservedSeats.length * 2;

    if (MAX_NUMBER_OF_RESERVATIONS <= reservedPeople) {
      return 0;
    }

    return MAX_NUMBER_OF_RESERVATIONS - reservedPeople;
  },

  /**
   * 予約データがあるかどうか
   * @param state
   * @returns boolean
   */
  [HAS_ITEMS]: (state: ReservationState): boolean => {
    return state.reservations.length > 0;
  }
};

export default getters;
