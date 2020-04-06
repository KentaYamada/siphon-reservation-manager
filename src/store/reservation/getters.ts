import { GetterTree } from "vuex";

// store
import { RootState } from "@/store";
import { HAS_ITEMS } from "@/store/constant";
import { ReservationState } from "@/store/reservation";

const getters: GetterTree<ReservationState, RootState> = {
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
