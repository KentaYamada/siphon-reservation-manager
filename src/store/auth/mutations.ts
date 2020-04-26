import { MutationTree } from "vuex";

// plugin
import _ from "lodash";

// store
import { SET_ITEM } from "@/store/constant";
import { AuthState } from "@/store/auth";

const mutations: MutationTree<AuthState> = {
  [SET_ITEM]: (state: AuthState, token: string | null): void => {
    state.token = token;
    state.is_signin = _.isNil(token);
  }
};

export default mutations;
