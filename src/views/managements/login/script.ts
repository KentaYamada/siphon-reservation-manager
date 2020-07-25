import Vue from "vue";
import { mapActions } from "vuex";
import { BNoticeConfig } from "buefy/types/components";

// store
import { SIGN_IN } from "@/store/constant";

export default Vue.extend({
  methods: {
    ...mapActions("auth", [SIGN_IN]),

    /**
     * サインイン
     */
    onClickSignIn(): void {
      this.signIn()
        .then(() => {
          const toastConfig: BNoticeConfig = {
            message: "ログインしました",
            type: "is-success"
          };
          this.$buefy.toast.open(toastConfig);
          this.$router.push({ name: "reservation-list" });
        })
        .catch(() => {
          const toastConfig: BNoticeConfig = {
            message: "ログイン失敗しました",
            type: "is-danger"
          };
          this.$buefy.toast.open(toastConfig);
        });
    }
  }
});
