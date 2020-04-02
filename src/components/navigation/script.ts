import Vue from "vue";

// entity
import { Navigation } from "@/entity/navigation";

// routing
import {
  INDEX_URL,
  RESERVATION_CANCELED_URL,
  RESERVATION_DETAIL_URL,
  RESERVATION_EDIT_URL,
  RESERVATION_EDITED_URL,
  RESERVED_MESSAGE_URL,
  MANAGEMENT_RESERVATION_ALL_RESERVED,
  MANAGEMENT_LOGIN_URL,
  MANAGEMENT_RESERVATION_LIST_URL,
  SHOP_SETTING_URL,
  FORBIDDEN_URL,
  NOTFOUND_URL
} from "@/router/url";

/**
 * ナビゲーションメニュー取得
 * @param isDevMode
 * @param isAdmin
 */
const getNavigations = (isDevMode: boolean, isAdmin: boolean): Navigation[] => {
  const navigations: Navigation[] = [];

  if (isDevMode) {
    const reservationMenu: Navigation[] = [
      {
        name: "予約",
        icon: "fa-calendar-alt",
        children: [
          {
            name: "予約登録",
            url: INDEX_URL,
            icon: "fa-calendar-plus"
          },
          {
            name: "予約内容確認",
            url: RESERVATION_DETAIL_URL,
            icon: "fa-calendar-alt"
          },
          {
            name: "予約変更",
            url: RESERVATION_EDIT_URL,
            icon: "fa-calendar-alt"
          },
          {
            name: "予約完了",
            url: RESERVED_MESSAGE_URL,
            icon: "fa-calendar-check"
          },
          {
            name: "予約変更完了",
            url: RESERVATION_EDITED_URL,
            icon: "fa-calendar-check"
          },
          {
            name: "予約キャンセル完了",
            url: RESERVATION_CANCELED_URL,
            icon: "fa-calendar-times"
          }
        ]
      }
    ];

    const otherMenu: Navigation[] = [
      {
        name: "その他",
        children: [
          {
            name: "ログイン",
            url: MANAGEMENT_LOGIN_URL,
            icon: "fa-sign-in-alt"
          },
          {
            name: "Forbidden",
            url: FORBIDDEN_URL
          },
          {
            name: "NotFound",
            url: NOTFOUND_URL
          }
        ]
      }
    ];

    navigations.push(...reservationMenu);
    navigations.push(...otherMenu);
  }

  if (isAdmin) {
    const adminMenu = [
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
            name: "貸切設定",
            url: MANAGEMENT_RESERVATION_ALL_RESERVED,
            icon: "fa-calendar-check"
          },
          {
            name: "営業設定",
            url: SHOP_SETTING_URL,
            icon: "fa-store"
          }
        ]
      }
    ];

    navigations.push(...adminMenu);
  }

  return navigations;
};

export default Vue.extend({
  template: "<navigation/>",
  methods: {
    toggleNavigation(): void {
      this.isShowNav = !this.isShowNav;
    },
    onCloseNavigation(): void {
      this.isShowNav = false;
    }
  },
  data() {
    // todo: 管理者画面かどうか
    const isShow = process.env.NODE_ENV === "development";
    const isDevMode = true;
    const isAdmin = true;
    const navigations = getNavigations(isDevMode, isAdmin);

    return {
      isShow: isShow,
      navigations: navigations,
      isShowNav: false
    };
  }
});
