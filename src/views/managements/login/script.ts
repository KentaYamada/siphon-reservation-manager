import Vue from "vue";
import { mapActions } from "vuex";
import { SIGN_IN } from "@/store/constant";

export default Vue.extend({
  methods: {
    ...mapActions("auth", [SIGN_IN]),

    /**
     * サインイン
     */
    onClickSignIn(): void {
      this.signIn();
    }
  }
});
