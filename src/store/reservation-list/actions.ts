import { ActionTree } from "vuex";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationService } from "@/services/firestore/reservation-service";
import { RootState } from "@/store";
import { FETCH, SET_ITEMS } from "@/store/constant";
import { ReservationListState } from "@/store/reservation-list";

const actions: ActionTree<ReservationListState, RootState> = {
  [FETCH]: async ({ commit }, payload: ReservationSearchOption) => {
    const reservations = await ReservationService.fetch(payload);
    commit(SET_ITEMS, reservations);
  }
};

export default actions;
