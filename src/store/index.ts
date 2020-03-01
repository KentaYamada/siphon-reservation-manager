import Vue from "vue";
import Vuex from "vuex";
import reservation from "@/store/reservation";
import reservationSeat from "@/store/reservation-seat";
import timezone from "@/store/timezone";

export interface RootState {
  version: 1;
}

Vue.use(Vuex);

export interface RootState {
  version: string;
}

export default new Vuex.Store({
  modules: {
    reservation,
    reservationSeat,
    timezone
  }
});
