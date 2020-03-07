import { GetterTree } from "vuex";
import { RootState } from "@/store";
import {
  ReservationState,
  MAX_NUMBER_OF_RESERVATIONS
} from "@/store/reservation";
import { GET_RESERVABLE_PEOPLE, HAS_ITEMS } from "@/store/constant";

const getters: GetterTree<ReservationState, RootState> = {
  /**
   * 予約可能人数取得
   * @param state
   * @param numberOfReservedSeats
   * @returns number
   */
  [GET_RESERVABLE_PEOPLE]: (state: ReservationState) => (
    numberOfReservedSeats: number
  ): number => {
    // 予約上限を満たしているか
    const reservedPeople = numberOfReservedSeats * 2;

    if (MAX_NUMBER_OF_RESERVATIONS <= reservedPeople) {
      return 0;
    }

    // 10名以上の予約不可
    if (MAX_NUMBER_OF_RESERVATIONS <= state.number_of_reservations) {
      return 0;
    }

    const reservablePeople = reservedPeople + state.number_of_reservations;

    if (MAX_NUMBER_OF_RESERVATIONS <= reservablePeople) {
      return 0;
    }

    return reservablePeople;
  },

  /**
   * 予約データがあるかどうか
   * @returns boolean
   */
  [HAS_ITEMS]: (state: ReservationState): boolean => {
    return state.reservations.length > 0;
  }
};

export default getters;
