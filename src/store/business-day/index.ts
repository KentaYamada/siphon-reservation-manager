import { Module } from "vuex";

// entity
import { BusinessDay } from "@/entity/business-day";

// store
import { RootState } from "@/store";
import actions from "@/store/business-day/actions";
import getters from "@/store/business-day/getters";
import mutations from "@/store/business-day/mutations";

export interface BusinessDayState {
  businessDays: BusinessDay[];
}

const state: BusinessDayState = {
  businessDays: []
};
const namespaced = true;
const module: Module<BusinessDayState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};

export default module;
