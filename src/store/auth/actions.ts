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
    const promise$ = firebase
      .auth()
      .signInWithPopup(provider)
      .then(response => {
        commit(SET_ITEM, true);
      });

    return await promise$;
  },

  /**
   * ログアウト
   */
  [SIGN_OUT]: async ({ commit }) => {
    return await firebase
      .auth()
      .signOut()
      .then(() => {
        commit(SET_ITEM, true);
      });
  }
};

export default actions;
