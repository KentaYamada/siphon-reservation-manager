import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import NewYearDishesSettingForm from "@/components/new-year-dishes-setting/form/NewYearDishesSettingForm.vue";

export default Vue.extend({
  components: {
    NewYearDishesSettingForm
  },
  methods: {
    handleValidationFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "入力内容に誤りがあります。エラーメッセージを確認してください。",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    }
  }
});
