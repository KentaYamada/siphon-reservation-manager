import { Module } from "vuex";
import { Reservation } from "@/entity/reservation";
import { RootState } from "@/store";
import actions from "@/store/reservation/actions";
import getters from "@/store/reservation/getters";
import mutations from "@/store/reservation/mutations";

export interface ReservationState {
  reservations: Reservation[];
}

const state: ReservationState = {
  reservations: []
};
const namespaced = true;
const module: Module<ReservationState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};

export default module;
