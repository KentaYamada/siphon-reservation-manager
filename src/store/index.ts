import Vue from "vue";
import Vuex from "vuex";

// store
import auth from "@/store/auth";
import businessDay from "@/store/business-day";
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
    businessDay,
    reservation,
    reservationSeat,
    timezone
  }
});
