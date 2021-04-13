import { Module } from "vuex";
import { Reservation } from "@/entity/reservation";
import { RootState } from "@/store";
import actions from "@/store/reservation/actions";
import getters from "@/store/reservation/getters";
import mutations from "@/store/reservation/mutations";

export const MAX_NUMBER_OF_RESERVATIONS = 8;

export interface ReservationState {
  reservation: Reservation;
  reservations: Reservation[];
}

const state: ReservationState = {
  reservation: {
    reservation_date: null,
    reservation_date_id: "",
    reservation_start_time: null,
    reservation_end_time: null,
    reservation_time_id: "",
    reserver_name: "",
    reservation_seats: [],
    number_of_reservations: null,
    tel: "",
    mail: "",
    comment: ""
  },
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
