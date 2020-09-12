import { MutationTree } from "vuex";
import { ReservationList } from "@/entity/reservation-list";
import { SET_ITEMS } from "@/store/constant";
import { ReservationListState } from "@/store/reservation-list";

const mutations: MutationTree<ReservationListState> = {
  [SET_ITEMS]: (state: ReservationListState, items: Array<ReservationList>): void => {
    state.reservationList = items;
  }
};

export default mutations;
