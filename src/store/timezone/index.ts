import { Module } from "vuex";
import { Timezone } from "@/entity/timezone";
import { RootState } from "@/store";
import actions from "@/store/timezone/actions";
import getters from "@/store/timezone/getters";
import mutations from "@/store/timezone/mutations";

export interface TimezoneState {
  timezones: Timezone[];
}

const state: TimezoneState = {
  timezones: []
};
const namespaced = true;
const module: Module<TimezoneState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};

export default module;
