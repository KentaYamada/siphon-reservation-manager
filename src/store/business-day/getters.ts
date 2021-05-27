import { GetterTree } from "vuex";
import _ from "lodash";
import { BusinessDay } from "@/entity/business-day";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { RootState } from "@/store";
import { HAS_ITEMS, GET_BY_ID, GET_SELECTABLE_TIMEZONES, GET_SELECTED_TIMEZONE } from "@/store/constant";
import { BusinessDayState } from "@/store/business-day";

const getters: GetterTree<BusinessDayState, RootState> = {
  [GET_BY_ID]:
    (state: BusinessDayState) =>
    (id: string): BusinessDay | undefined => {
      return _.find(state.businessDays, (item: BusinessDay) => {
        return item.id === id;
      });
    },

  [GET_SELECTABLE_TIMEZONES]:
    (state: BusinessDayState) =>
    (id: string): Array<SelectableTimezone> => {
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
    },

  [GET_SELECTED_TIMEZONE]:
    (state: BusinessDayState) =>
    (id: string, timezoneId: string): SelectableTimezone | null => {
      if (_.isNil(state.businessDays)) {
        return null;
      }

      const businessDay = _.find(state.businessDays, (item: BusinessDay) => {
        return item.id === id;
      });

      if (_.isNil(businessDay) || _.isNil(businessDay.timezones)) {
        return null;
      }

      const timezone = _.find(businessDay.timezones, (item: SelectableTimezone) => {
        return item.id === timezoneId;
      });

      return _.isNil(timezone) ? null : timezone;
    },

  [HAS_ITEMS]: (state: BusinessDayState): boolean => {
    return state.businessDays.length > 0;
  }
};

export default getters;
