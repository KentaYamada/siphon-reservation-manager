import { Module } from "vuex";
import { RootState } from "@/store";
import actions from "@/store/auth/actions";
import mutations from "@/store/auth/mutations";
import getters from "@/store/auth/getters";

export interface AuthState {
  is_signin: boolean;
}

const state: AuthState = {
  is_signin: false
};

const namespaced = true;
const module: Module<AuthState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters
};

export default module;
