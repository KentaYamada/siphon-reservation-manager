import { Module } from "vuex";
import { ReservationSeat } from "@/entity/reservation-seat";
import { RootState } from "@/store";
import actions from "@/store/reservation-seat/actions";
import mutations from "@/store/reservation-seat/mutations";
import getters from "@/store/reservation-seat/getters";

/** 予約最大人数 */
export const MAX_NUMBER_OF_RESERVATIONS = 10;

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
  mutations,
  getters
};

export default module;
