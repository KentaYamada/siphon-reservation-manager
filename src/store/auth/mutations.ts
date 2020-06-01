import { MutationTree } from "vuex";

// store
import { SET_ITEM } from "@/store/constant";
import { AuthState } from "@/store/auth";

const mutations: MutationTree<AuthState> = {
  [SET_ITEM]: (state: AuthState, isSignIn: boolean): void => {
    state.is_signin = isSignIn;
  }
};

export default mutations;
