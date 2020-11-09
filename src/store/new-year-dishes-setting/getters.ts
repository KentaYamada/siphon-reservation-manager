import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { NewYearDishesSettingState } from "@/store/new-year-dishes-setting";
import { GET_QUANTITY_LIST } from "@/store/constant";

const getters: GetterTree<NewYearDishesSettingState, RootState> = {
  [GET_QUANTITY_LIST]: (state: NewYearDishesSettingState): Array<number> => {
    return [...Array(3).keys()].map(i => ++i);
  }
};

export default getters;
