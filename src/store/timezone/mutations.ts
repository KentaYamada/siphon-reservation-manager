import { MutationTree } from "vuex";
import { Timezone } from "@/entity/timezone";
import { INITIALIZE, SET_ITEM, SET_ITEMS } from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const mutations: MutationTree<TimezoneState> = {
  [INITIALIZE]: (state: TimezoneState): void => {
    state.timezone = {
      start_time: new Date(),
      end_time: new Date(),
      is_default_select: false
    } as Timezone;
  },

  [SET_ITEM]: (state: TimezoneState, item: Timezone): void => {
    state.timezone = item;
  },

  [SET_ITEMS]: (state: TimezoneState, items: Timezone[]): void => {
    state.timezones = items;
  }
};

export default mutations;
