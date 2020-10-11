import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import { Navigation } from "@/entity/navigation";
import {
  INDEX_URL,
  EMAIL_MESSAGE_LIST_URL,
  MANAGEMENT_RESERVATION_LIST_URL,
  SHOP_SETTING_URL,
  HELP_MAIL_UNREACHED
} from "@/router/url";
import { IS_ADMIN, IS_SIGNED_IN, SIGN_OUT } from "@/store/constant";

const getNavigations = (): Navigation[] => {
  const navigations: Navigation[] = [
    {
      name: "予約",
      icon: "fa-calendar-alt",
      children: [
        {
          name: "予約登録",
          url: INDEX_URL,
          icon: "fa-calendar-plus"
        }
      ]
    },
    {
      name: "管理",
      url: "",
      icon: "fa-user-shield",
      children: [
        {
          name: "予約一覧",
          url: MANAGEMENT_RESERVATION_LIST_URL,
          icon: "fa-list"
        },
        {
          name: "営業設定",
          url: SHOP_SETTING_URL,
          icon: "fa-store"
        },
        {
          name: "メールメッセージ設定",
          url: EMAIL_MESSAGE_LIST_URL,
          icon: "fa-envelope"
        }
      ]
    },
    {
      name: "トラブルシューティング",
      url: "",
      icon: "fa-question-circle",
      children: [
        {
          name: "自動配信メール不着時の対応",
          url: HELP_MAIL_UNREACHED,
          icon: "fa-envelope"
        }
      ]
    }
  ];

  return navigations;
};

export default Vue.extend({
  template: "<navigation/>",
  computed: {
    ...mapGetters("auth", [IS_ADMIN, IS_SIGNED_IN])
  },
  methods: {
    ...mapActions("auth", [SIGN_OUT]),

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
      navigations: getNavigations(),
      isShowNav: false
    };
  }
});
