import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";
import reservation from "@/store/reservation";
import reservationSeat from "@/store/reservation-seat";
import timezone from "@/store/timezone";

export interface RootState {
  version: 1;
}

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    reservation,
    reservationSeat,
    timezone
  }
});
