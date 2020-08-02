import { GetterTree } from "vuex";
import _ from "lodash";
import { BusinessDay } from "@/entity/business-day";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { RootState } from "@/store";
import { HAS_ITEMS, GET_BY_ID, GET_SELECTABLE_TIMEZONES } from "@/store/constant";
import { BusinessDayState } from "@/store/business-day";

const getters: GetterTree<BusinessDayState, RootState> = {
  [GET_BY_ID]: (state: BusinessDayState) => (id: string): BusinessDay | undefined => {
    return _.find(state.businessDays, (item: BusinessDay) => {
      return item.id === id;
    });
  },

  [HAS_ITEMS]: (state: BusinessDayState): boolean => {
    return state.businessDays.length > 0;
  },

  [GET_SELECTABLE_TIMEZONES]: (state: BusinessDayState) => (id: string): Array<SelectableTimezone> => {
    if (_.isNil(state.businessDays)) {
      return [];
    }

    const businessDay = _.find(state.businessDays, (item: BusinessDay) => {
      return item.id === id;
    });

    if (_.isNil(businessDay)) {
      return [];
    }

    return businessDay.timezones as Array<SelectableTimezone>;
  }
};

export default getters;
