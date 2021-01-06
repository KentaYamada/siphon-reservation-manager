import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import { INITIALIZE, IS_ADMIN, IS_SIGNED_IN, SIGN_OUT } from "@/store/constant";

export default Vue.extend({
  template: "<navigation/>",
  computed: {
    ...mapGetters("auth", [IS_ADMIN, IS_SIGNED_IN]),
    ...mapState("navigation", ["navigations"])
  },
  methods: {
    ...mapActions("auth", [SIGN_OUT]),
    ...mapMutations("navigation", [INITIALIZE]),

    toggleNavigation(): void {
      this.isShowNav = !this.isShowNav;
    },

    onCloseNavigation(): void {
      this.isShowNav = false;
    },

    onClickSignOut(): void {
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
  data() {
    return {
      isShowNav: false
    };
  },
  created() {
    this.initialize();
  }
});
