import { ActionTree } from "vuex";
import { ReservationList } from "@/entity/reservation-list";
import { ReservationListSeat } from "@/entity/reservation-list-seat";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { RootState } from "@/store";
import { FETCH, SET_ITEMS } from "@/store/constant";
import { ReservationListState } from "@/store/reservation-list";

const actions: ActionTree<ReservationListState, RootState> = {
  [FETCH]: ({ commit }, option: ReservationSearchOption) => {
    const items: Array<ReservationList> = [];
    commit(SET_ITEMS, items);
  }
};

export default actions;
