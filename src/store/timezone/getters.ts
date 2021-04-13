import _ from "lodash";
import { GetterTree } from "vuex";
import { Timezone } from "@/entity/timezone";
import { RootState } from "@/store";
import { GET_BY_ID, HAS_ITEMS } from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const getters: GetterTree<TimezoneState, RootState> = {
  [GET_BY_ID]: (state: TimezoneState) => (id: string): Timezone | undefined => {
    return _.find(state.timezones, (item: Timezone) => {
      return item.id === id;
    });
  },

  [HAS_ITEMS]: (state: TimezoneState): boolean => {
    return state.timezones.length > 0;
  }
};

export default getters;
