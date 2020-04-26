import { ActionTree } from "vuex";

// plugin
import * as firebase from "firebase";

// strore
import { RootState } from "@/store";
import { AuthState } from "@/store/auth";
import { SIGN_IN, SIGN_OUT } from "@/store/constant";

const actions: ActionTree<AuthState, RootState> = {
  /**
   * ログイン
   * (Google認証)
   */
  [SIGN_IN]: async ({ commit }) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const promise$ = firebase
      .auth()
      .signInWithPopup(provider)
      .then(response => {
        console.log(response);
      });

    return await promise$;
  },
  [SIGN_OUT]: async ({ commit }) => {
    console.log("run sign out");
  }
};

export default actions;
