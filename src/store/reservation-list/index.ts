import { Module } from "vuex";
import { ReservationList } from "@/entity/reservation-list";
import { RootState } from "@/store";
import actions from "@/store/reservation-list/actions";
import getters from "@/store/reservation-list/getters";
import mutations from "@/store/reservation-list/mutations";

export interface ReservationListState {
  reservationList: Array<ReservationList>;
}

const state: ReservationListState = {
  reservationList: []
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
