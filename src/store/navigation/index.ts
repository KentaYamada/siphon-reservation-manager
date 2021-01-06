import { Module } from "vuex";
import { Navigation } from "@/entity/navigation";
import { RootState } from "@/store";
import mutations from "@/store/navigation/mutations";

export interface NavigationState {
  navigations: Array<Navigation>;
}

const state: NavigationState = {
  navigations: []
};
const namespaced = true;
const module: Module<NavigationState, RootState> = {
  namespaced,
  state,
  mutations
};

export default module;
