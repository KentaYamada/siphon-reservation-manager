import { ActionTree } from "vuex";

// plugin
import firebase from "firebase";

// strore
import { RootState } from "@/store";
import { AuthState } from "@/store/auth";
import { SET_ITEM, SIGN_IN, SIGN_OUT } from "@/store/constant";

const actions: ActionTree<AuthState, RootState> = {
  /**
   * ログイン
   * (Google account認証)
   */
  [SIGN_IN]: async ({ commit }) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        commit(SET_ITEM, true);
      });
  },

  /**
   * ログアウト
   */
  [SIGN_OUT]: async ({ commit }) => {
    return await firebase
      .auth()
      .signOut()
      .then(() => {
        commit(SET_ITEM, false);
      });
  }
};

export default actions;
