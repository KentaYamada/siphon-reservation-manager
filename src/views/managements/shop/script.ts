import Vue from "vue";
import { BModalConfig, BNoticeConfig } from "buefy/types/components";
import _ from "lodash";
import BusinessDayDialog from "@/components/business-day/dialog/BusinessDayDialog.vue";
import BusinessDayList from "@/components/business-day/list/BusinessDayList.vue";
import TimezoneDialog from "@/components/timezones/dialog/TimezoneDialog.vue";
import TimezoneList from "@/components/timezones/list/TimezoneList.vue";

export default Vue.extend({
  components: {
    BusinessDayList,
    TimezoneList
  },
  methods: {
    handleBusinessDaysLoaded(): void {
      this.isCreatedBusinessDay = false;
    },

    handleTimezonesLoaded(): void {
      this.isCreatedTimezone = false;
    },

    handleDeleteBusinessDaySucceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "営業日を削除しました",
        type: "is-success"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleDeleteBusinessDayFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "営業日の削除に失敗しました",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleDeleteTimezoneSucceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "予約時間帯を削除しました",
        type: "is-success"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleDeleteTimezoneFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "予約時間帯の削除に失敗しました",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleLoadBusinessDayFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "営業日の読み込みに失敗したため、設定画面が開けませんでした",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleLoadBusinessDaysFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "営業日一覧の取得に失敗しました",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleLoadTimezoneFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "予約時間帯の読み込みに失敗したため、設定画面が開けませんでした",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleLoadTimezonesFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "予約時間帯一覧の取得に失敗しました",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleSaveBusinessDaySucceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "営業日を設定しました",
        type: "is-success"
      };
      this.$buefy.toast.open(toastConfig);
      this.isCreatedBusinessDay = true;
      this.showMenuButton = false;
    },

    handleSaveBusinessDayFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "営業日を設定できませんでした",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleSaveTimezoneSuceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "予約時間帯を設定しました",
        type: "is-success"
      };
      this.$buefy.toast.open(toastConfig);
      this.isCreatedTimezone = true;
      this.showMenuButton = false;
    },

    handleSaveTimezoneFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "予約時間帯を設定できませんでした",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    },

    handleShowBusinessDayDialog(): void {
      const config: BModalConfig = {
        parent: this,
        component: BusinessDayDialog,
        hasModalCard: true,
        events: {
          "load-business-day-failed": () => {
            this.handleLoadBusinessDayFailed();
          },
          "save-succeeded": () => {
            this.handleSaveBusinessDaySucceeded();
          },
          "save-failed": () => {
            this.handleSaveBusinessDayFailed();
          },
          "validation-failed": () => {
            this.handleValidationFailed();
          }
        }
      };
      this.$buefy.modal.open(config);
    },

    handleShowTimezoneDialog(): void {
      const modalConfig: BModalConfig = {
        parent: this,
        component: TimezoneDialog,
        hasModalCard: true,
        events: {
          "load-timzeone-failed": () => {
            this.handleLoadTimezoneFailed();
          },
          "save-succeeded": () => {
            this.handleSaveTimezoneSuceeded();
          },
          "save-failed": () => {
            this.handleSaveTimezoneFailed();
          },
          "validation-failed": () => {
            this.handleValidationFailed();
          }
        }
      };
      this.$buefy.modal.open(modalConfig);
    },

    handleToggleMenuButtons(): void {
      this.showMenuButton = !this.showMenuButton;
    },

    handleValidationFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "入力内容に誤りがあります。エラーメッセージを確認してください。",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    }
  },
  data() {
    return {
      showMenuButton: false,
      isCreatedBusinessDay: false,
      isCreatedTimezone: false
    };
  }
});
