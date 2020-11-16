import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import NewYearDishesSettingForm from "@/components/new-year-dishes-setting/form/NewYearDishesSettingForm.vue";

export default Vue.extend({
  components: {
    NewYearDishesSettingForm
  },
  methods: {
    handleLoadFailed() {
      const toastConfig: BNoticeConfig = {
        message: "データの読み込みに失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleSaveSucceeded() {
      const toastConfig: BNoticeConfig = {
        message: "保存しました",
        type: "is-success"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleSaveFailed() {
      const toastConfig: BNoticeConfig = {
        message: "保存に失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleUpdateProgress(isProgress: boolean) {
      this.isProgress = isProgress;
    },

    handleValidationFailed() {
      const toastConfig: BNoticeConfig = {
        message: "入力内容に誤りがあります。エラーメッセージを確認してください",
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
