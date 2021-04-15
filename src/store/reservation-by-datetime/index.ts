import { Module } from "vuex";
import { ReservationByDateTime } from "@/entity/reservation-by-datetime";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { RootState } from "@/store";
import actions from "@/store/reservation-by-datetime/actions";
import getters from "@/store/reservation-by-datetime/getters";
import mutations from "@/store/reservation-by-datetime/mutations";

export interface ReservationByDateTimeState {
  reservations: Array<ReservationByDateTime>;
  searchOption: ReservationSearchOption;
}

const state: ReservationByDateTimeState = {
  reservations: [],
  searchOption: {
    reservation_date_id: "",
    reservation_time_id: ""
  }
};

const namespaced = true;
const module: Module<ReservationByDateTimeState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};

export default module;
