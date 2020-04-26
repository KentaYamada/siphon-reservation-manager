import Vue from "vue";
import { mapActions } from "vuex";
import { ToastConfig } from "buefy/types/components";

// store
import { SIGN_IN } from "@/store/constant";

export default Vue.extend({
  methods: {
    ...mapActions("auth", [SIGN_IN]),

    /**
     * サインイン
     */
    onClickSignIn(): void {
      this.signIn().then(() => {
        const toastConfig: ToastConfig = {
          message: "ログインしました",
          type: "is-success"
        };
        this.$buefy.toast.open(toastConfig);
        this.$router.push({ name: "reservation-list" });
      });
    }
  }
});
