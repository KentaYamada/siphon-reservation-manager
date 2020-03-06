import { Module } from "vuex";
import { ReservationSeat } from "@/entity/reservation-seat";
import { RootState } from "@/store";
import actions from "@/store/reservation-seat/actions";
import mutations from "@/store/reservation-seat/mutations";

export interface ReservationSeatState {
  reservationSeats: ReservationSeat[];
}

const state: ReservationSeatState = {
  reservationSeats: []
};
const namespaced = true;
const module: Module<ReservationSeatState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
};

export default module;
