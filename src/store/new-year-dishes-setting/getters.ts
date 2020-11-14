import moment from "moment";
import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { NewYearDishesSettingState } from "@/store/new-year-dishes-setting";
import { GET_QUANTITY_LIST, IS_ACCESSIBLE } from "@/store/constant";

const getters: GetterTree<NewYearDishesSettingState, RootState> = {
  [GET_QUANTITY_LIST]: (state: NewYearDishesSettingState): Array<number> => {
    return [...Array(state.setting.max_quantity_per_reservation).keys()].map(i => ++i);
  },

  [IS_ACCESSIBLE]: (state: NewYearDishesSettingState): boolean => {
    if (state.setting.is_pause) {
      return false;
    }

    if (moment().diff(state.setting.end_datetime) <= 0) {
      return false;
    }

    return true;
  }
};

export default getters;
