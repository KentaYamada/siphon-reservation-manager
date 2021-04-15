import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { HAS_ITEMS } from "@/store/constant";
import { ReservationByDateTimeState } from "@/store/reservation-by-datetime";

const getters: GetterTree<ReservationByDateTimeState, RootState> = {
  [HAS_ITEMS]: (state: ReservationByDateTimeState): boolean => {
    return state.reservations.length > 0;
  }
};

export default getters;
