import Vue from "vue";
import Vuex from "vuex";
import reservation from "@/store/reservation";
import timezone from "@/store/timezone";

export interface RootState {
  version: 1;
}

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    reservation,
    timezone
  }
});
