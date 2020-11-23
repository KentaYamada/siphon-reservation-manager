import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import ReservationList from "@/components/reservations/list/ReservationList.vue";
import ReservationSearchForm from "@/components/reservations/search/ReservationSearchForm.vue";
import { ReservationSearchOption } from "@/entity/reservation-search-option";

export default Vue.extend({
  components: {
    ReservationList,
    ReservationSearchForm
  },
  methods: {
    handleCancelFailed() {
      const toastConfig: BNoticeConfig = {
        message: "予約の取り消しに失敗しました",
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

    handleInitializeFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "データの初期化に失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleSearch(searchParams: ReservationSearchOption): void {
      this.searchParams = searchParams;
    },

    handleUpdateProgress(isProgress: boolean) {
      this.isProgress = isProgress;
    }
  },
  data() {
    const searchParams: ReservationSearchOption = {
      reservation_date_id: "",
      reservation_time_id: ""
    };

    return {
      isProgress: false,
      searchParams: searchParams
    };
  }
});
