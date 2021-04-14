import { Module } from "vuex";
import { ReservationList } from "@/entity/reservation-list";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { RootState } from "@/store";
import actions from "@/store/reservation-list/actions";
import getters from "@/store/reservation-list/getters";
import mutations from "@/store/reservation-list/mutations";

export interface ReservationListState {
  reservationList: Array<ReservationList>;
  searchOption: ReservationSearchOption;
}

const state: ReservationListState = {
  reservationList: [],
  searchOption: {
    reservation_date_id: "",
    reservation_time_id: ""
  }
};
const namespaced = true;
const module: Module<ReservationListState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};

export default module;
