import Vue from "vue";
import {
  INDEX_URL,
  RESERVATION_CANCELED_URL,
  RESERVATION_DETAIL_URL,
  RESERVATION_EDIT_URL,
  RESERVED_MESSAGE_URL,
  MANAGEMENT_LOGIN_URL,
  MANAGEMENT_RESERVATION_LIST_URL,
  SHOP_SETTING_URL,
  FORBIDDEN_URL
} from "@/router/url";

const getNavigations = () => {
  const navigations = [
    { name: "予約登録", url: INDEX_URL },
    { name: "予約完了", url: RESERVED_MESSAGE_URL },
    { name: "予約内容確認", url: `${RESERVATION_DETAIL_URL}/1` },
    { name: "予約変更", url: `${RESERVATION_EDIT_URL}/1` },
    { name: "予約キャンセル完了", url: RESERVATION_CANCELED_URL },
    { name: "[管理] 予約一覧", url: MANAGEMENT_RESERVATION_LIST_URL },
    { name: "[管理] 店舗設定", url: SHOP_SETTING_URL },
    { name: "[管理] ログイン", url: MANAGEMENT_LOGIN_URL },
    { name: "403ページ", url: FORBIDDEN_URL },
    { name: "404ページ", url: "/notfound" }
  ];

  return navigations;
};

export default Vue.extend({
  data() {
    return {
      navigations: getNavigations(),
      isShowNav: true
    };
  }
});
