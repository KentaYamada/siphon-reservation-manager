import { MutationTree } from "vuex";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { SET_ITEM } from "@/store/constant";
import { NewYearDishesSettingState } from "@/store/new-year-dishes-setting";

const mutations: MutationTree<NewYearDishesSettingState> = {
  [SET_ITEM]: (state: NewYearDishesSettingState, payload: NewYearDishesSetting) => {
    state.setting = payload;
  }
};

export default mutations;
