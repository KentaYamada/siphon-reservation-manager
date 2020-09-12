import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "@/store/auth";
import businessDay from "@/store/business-day";
import reservation from "@/store/reservation";
import reservationList from "@/store/reservation-list";
import reservationResendMail from "@/store/reservation-resend-mail";
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
    reservationList,
    timezone
  },
  plugins: [
    createPersistedState({
      key: "ReservationAppAuth",
      paths: ["auth.auth_user"],
      storage: window.localStorage
    })
  ]
});
