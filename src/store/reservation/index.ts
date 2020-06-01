import { Module } from "vuex";
import { Reservation } from "@/entity/reservation";
import { RootState } from "@/store";
import actions from "@/store/reservation/actions";
import getters from "@/store/reservation/getters";
import mutations from "@/store/reservation/mutations";

// export const MAX_NUMBER_OF_RESERVATIONS = 10;
export const MAX_NUMBER_OF_RESERVATIONS = 8;

export interface ReservationState {
  reservation: Reservation | null;
  reservations: Reservation[];
}

const state: ReservationState = {
  reservation: null,
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
