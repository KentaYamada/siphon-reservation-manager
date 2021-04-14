import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { HAS_ITEMS } from "@/store/constant";
import { ReservationListState } from "@/store/reservation-list";

const getters: GetterTree<ReservationListState, RootState> = {
  [HAS_ITEMS]: (state: ReservationListState): boolean => {
    return state.reservationList.length > 0;
  }
};

export default getters;
