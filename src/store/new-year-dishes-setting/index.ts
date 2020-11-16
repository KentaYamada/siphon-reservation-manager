import { Module } from "vuex";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { RootState } from "@/store";
import getters from "@/store/new-year-dishes-setting/getters";
import mutations from "@/store/new-year-dishes-setting/mutations";

export interface NewYearDishesSettingState {
  setting: NewYearDishesSetting;
}

const state: NewYearDishesSettingState = {
  setting: {} as NewYearDishesSetting
};
const namespaced = true;
const module: Module<NewYearDishesSettingState, RootState> = {
  namespaced,
  state,
  getters,
  mutations
};

export default module;
