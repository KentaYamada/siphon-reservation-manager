import { Module } from "vuex";
import { RootState } from "@/store";
import actions from "@/store/auth/actions";
import mutations from "@/store/auth/mutations";

export interface AuthState {
  token: string;
  is_signin: boolean;
}

const state: AuthState = {
  token: "",
  is_signin: false
};

const namespaced = true;
const module: Module<AuthState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
};

export default module;
