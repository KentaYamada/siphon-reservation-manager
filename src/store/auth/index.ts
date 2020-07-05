import { Module } from "vuex";
import { RootState } from "@/store";
import actions from "@/store/auth/actions";
import mutations from "@/store/auth/mutations";
import getters from "@/store/auth/getters";

import firebase from "firebase";

export interface AuthState {
  is_signed_in: boolean;
  auth_user: firebase.UserInfo | null;
}

const state: AuthState = {
  is_signed_in: false,
  auth_user: null
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
