import Vue from "vue";
import {
  INDEX_URL,
  RESERVATION_DETAIL_URL,
  RESERVED_MESSAGE_URL,
  MANAGEMENT_LOGIN_URL,
  MANAGEMENT_RESERVATION_LIST_URL,
  MANAGEMENT_RESERVATION_SETTING_URL,
  FORBIDDEN_URL
} from "@/router/url";

const getNavigations = () => {
  const navigations = [
    { name: "予約登録", url: INDEX_URL },
    { name: "予約完了", url: RESERVED_MESSAGE_URL },
    { name: "予約内容確認", url: `${RESERVATION_DETAIL_URL}/1` },
    { name: "[管理] 予約一覧", url: MANAGEMENT_RESERVATION_LIST_URL },
    { name: "[管理] 予約一覧", url: MANAGEMENT_RESERVATION_LIST_URL },
    { name: "[管理] 営業日設定", url: MANAGEMENT_RESERVATION_SETTING_URL },
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
