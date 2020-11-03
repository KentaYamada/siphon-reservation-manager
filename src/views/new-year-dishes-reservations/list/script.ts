import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import NewYearDishesReservationList from "@/components/new-year-dishes-reservations/list/NewYearDishesReservationList.vue";

export default Vue.extend({
  components: {
    NewYearDishesReservationList
  },
  methods: {
    handleLoadFailed() {
      const toastConfig: BNoticeConfig = {
        message: "データの読み込みに失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleCancelSucceeded() {
      const toastConfig: BNoticeConfig = {
        message: "予約取り消しました",
        type: "is-success"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleCancelFailed() {
      const toastConfig: BNoticeConfig = {
        message: "予約の取り消しに失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleUpdateProgress(isProgress: boolean) {
      this.isProgress = isProgress;
    }
  },
  data() {
    return {
      isProgress: false
    };
  }
});
