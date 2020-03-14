import { Module } from "vuex";
import { RootState } from "@/store";
import actions from "@/store/auth/actions";

export interface AuthState {
  token: string;
}

const state: AuthState = {
  token: ""
};

const namespaced = true;
const module: Module<AuthState, RootState> = {
  namespaced,
  state,
  actions
};

export default module;
