import { GetterTree } from "vuex";

// plugin
import _ from "lodash";

// store
import { RootState } from "@/store";
import { AuthState } from "@/store/auth";
import { IS_ADMIN, IS_SIGNED_IN } from "@/store/constant";

const getters: GetterTree<AuthState, RootState> = {
  /**
   * 管理者かどうか
   */
  [IS_ADMIN]: (state: AuthState): boolean => {
    return process.env.NODE_ENV === "development" || !_.isNil(state.auth_user);
  },

  [IS_SIGNED_IN]: (state: AuthState): boolean => {
    return !_.isNil(state.auth_user);
  }
};

export default getters;
