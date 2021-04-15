import { ActionTree } from "vuex";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationService } from "@/services/firestore/reservation-service";
import { RootState } from "@/store";
import { FETCH, SET_ITEMS } from "@/store/constant";
import { ReservationByDateTimeState } from "@/store/reservation-by-datetime";

const actions: ActionTree<ReservationByDateTimeState, RootState> = {
  [FETCH]: async ({ commit }, payload: ReservationSearchOption) => {
    const reservations = await ReservationService.fetch(payload);
    commit(SET_ITEMS, reservations);

    return reservations;
  }
};

export default actions;
