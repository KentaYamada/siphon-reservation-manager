import { GetterTree } from "vuex";

// store
import { RootState } from "@/store";
import { AuthState } from "@/store/auth";
import { IS_ADMIN, IS_SIGNED_IN } from "@/store/constant";

const getters: GetterTree<AuthState, RootState> = {
  /**
   * 管理者かどうか
   */
  [IS_ADMIN]: (state: AuthState): boolean => {
    return process.env.NODE_ENV === "development" || state.is_signin;
  },

  [IS_SIGNED_IN]: (state: AuthState): boolean => {
    return state.is_signin;
  }
};

export default getters;
