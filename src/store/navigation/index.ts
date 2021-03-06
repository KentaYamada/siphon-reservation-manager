import { Module } from "vuex";
import { RootState } from "@/store";
import { Navigation } from "@/entity/navigation";
import {
  INDEX_URL,
  MANAGEMENT_RESERVATION_LIST_URL,
  SHOP_SETTING_URL,
  HELP_MAIL_UNREACHED,
  NEW_YEAR_DISHED_RESERVATION_LIST_URL,
  NEW_YEAR_DISHES_RESERVATION_ENTRY_URL,
  NEW_YEAR_DISHES_SETTING_URL
} from "@/router/url";

export interface NavigationState {
  navigations: Array<Navigation>;
}

const state: NavigationState = {
  navigations: [
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
          name: "新春スイーツ予約受付",
          url: NEW_YEAR_DISHES_RESERVATION_ENTRY_URL,
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
          name: "新春スイーツ予約一覧",
          url: NEW_YEAR_DISHED_RESERVATION_LIST_URL,
          icon: "fa-list"
        },
        {
          name: "営業設定",
          url: SHOP_SETTING_URL,
          icon: "fa-store"
        },
        {
          name: "新春スイーツ予約設定",
          url: NEW_YEAR_DISHES_SETTING_URL,
          icon: "fa-store"
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
  ]
};
const namespaced = true;
const module: Module<NavigationState, RootState> = {
  namespaced,
  state
};

export default module;
