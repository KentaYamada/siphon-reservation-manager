import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { BNoticeConfig } from "buefy/types/components";

// entity
import { Navigation } from "@/entity/navigation";

// routing
import {
  INDEX_URL,
  MANAGEMENT_RESERVATION_ALL_RESERVED,
  MANAGEMENT_RESERVATION_LIST_URL,
  SHOP_SETTING_URL
} from "@/router/url";

// store
import { IS_ADMIN, IS_SIGNED_IN, SIGN_OUT } from "@/store/constant";

/**
 * ナビゲーションメニュー取得
 */
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
        // {
        //   name: "貸切設定",
        //   url: MANAGEMENT_RESERVATION_ALL_RESERVED,
        //   icon: "fa-calendar-check"
        // },
        {
          name: "営業設定",
          url: SHOP_SETTING_URL,
          icon: "fa-store"
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
