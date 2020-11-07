import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import NewYearDishesReservationForm from "@/components/new-year-dishes-reservations/form/NewYearDishesReservationForm.vue";
import { NEW_YEAR_DISHES_RESERVED_MESSAGE_URL } from "@/router/url";

export default Vue.extend({
  components: {
    NewYearDishesReservationForm
  },
  methods: {
    handleInitializeFailed() {
      const toastConfig: BNoticeConfig = {
        message: "データの初期化に失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleSaveSucceeded() {
      const toastConfig: BNoticeConfig = {
        message: "予約しました",
        type: "is-success"
      };

      this.$buefy.toast.open(toastConfig);
      this.$router.push({ path: NEW_YEAR_DISHES_RESERVED_MESSAGE_URL });
    },

    handleSaveFailed() {
      const toastConfig: BNoticeConfig = {
        message: "予約することができませんでした",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleUpdateProgress(isProgress: boolean) {
      this.isProgress = isProgress;
    },

    handleValidationFailed() {
      const toastConfig: BNoticeConfig = {
        message: "入力内容に誤りがあります。エラーメッセージを確認してください。",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    }
  },
  data() {
    return {
      isProgress: false
    };
  }
});
