import { Module } from "vuex";
import { BusinessDay } from "@/entity/business-day";
import { Timezone } from "@/entity/timezone";
import { RootState } from "@/store";
import actions from "@/store/shop/actions";
import mutations from "@/store/shop/mutations";

export interface ShopState {
  businessDays: BusinessDay[];
  timezones: Timezone[];
}

const state: ShopState = {
  businessDays: [],
  timezones: []
};
const namespaced = true;
const module: Module<ShopState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
};

export default module;
