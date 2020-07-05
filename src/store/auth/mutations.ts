import { MutationTree } from "vuex";

// plugin
import _ from "lodash";
import firebase from "firebase";

// store
import { SET_ITEM } from "@/store/constant";
import { AuthState } from "@/store/auth";

const mutations: MutationTree<AuthState> = {
  [SET_ITEM]: (state: AuthState, authUser: firebase.User | null): void => {
    state.is_signed_in = !_.isNil(authUser);
    state.auth_user = authUser?.toJSON() as firebase.User;
  }
};

export default mutations;
