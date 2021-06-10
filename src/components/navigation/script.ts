import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import { IS_ADMIN, IS_SIGNED_IN, SIGN_OUT } from "@/store/constant";

/**
 * Navagation bar component
 */
export default Vue.extend({
  name: "navigation",
  computed: {
    ...mapGetters("auth", [IS_ADMIN, IS_SIGNED_IN]),
    ...mapState("navigation", ["navigations"])
  },
  methods: {
    ...mapActions("auth", [SIGN_OUT]),

    handleSignout(): void {
      this.signOut().then(() => {
        const toastConfig: BNoticeConfig = {
          message: "ログアウトしました",
          type: "is-success"
        };

        this.$buefy.toast.open(toastConfig);
        this.$router.push({ name: "login" });
      });
    }
  },
  template: "<navigation/>"
});
