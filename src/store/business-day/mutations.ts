import { MutationTree } from "vuex";
import { BusinessDay } from "@/entity/business-day";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { INITIALIZE, SET_ITEM, SET_ITEMS, SET_SELECTABLE_TIMEZONES } from "@/store/constant";
import { BusinessDayState } from "@/store/business-day";

const mutations: MutationTree<BusinessDayState> = {
  [INITIALIZE]: (state: BusinessDayState): void => {
    state.businessDay = {
      text: "",
      business_date: new Date(),
      timezones: []
    } as BusinessDay;
  },

  [SET_ITEM]: (state: BusinessDayState, item: BusinessDay): void => {
    state.businessDay = item;
  },

  [SET_ITEMS]: (state: BusinessDayState, items: Array<BusinessDay>): void => {
    state.businessDays = items;
  },

  [SET_SELECTABLE_TIMEZONES]: (state: BusinessDayState, timezones: Array<SelectableTimezone>): void => {
    if (state.businessDay) {
      state.businessDay.timezones = timezones;
    }
  }
};

export default mutations;
