import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { ReservationState } from "@/store/reservation";
import { HAS_ITEMS } from "@/store/constant";

const getters: GetterTree<ReservationState, RootState> = {
  /**
   * 予約データがあるかどうか
   * @returns boolean
   */
  [HAS_ITEMS]: (state: ReservationState): boolean => {
    return state.reservations.length > 0;
  }
};

export default getters;
