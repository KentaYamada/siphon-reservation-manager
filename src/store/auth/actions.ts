import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { AuthState } from "@/store/auth";
import { SIGN_IN, SIGN_OUT } from "@/store/constant";

const actions: ActionTree<AuthState, RootState> = {
  [SIGN_IN]: async ({ commit }) => {
    console.log("run sign in");
  },
  [SIGN_OUT]: async ({ commit }) => {
    console.log("run sign out");
  }
};

export default actions;
