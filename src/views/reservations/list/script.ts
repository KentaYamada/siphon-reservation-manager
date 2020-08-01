import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import ReservationList from "@/components/reservations/list/ReservationList.vue";
import ReservationSearchForm from "@/components/reservations/search/ReservationSearchForm.vue";

export default Vue.extend({
  components: {
    ReservationList,
    ReservationSearchForm
  },
  methods: {
    handleUpdateReservationDateId(reservationDateId: string): void {
      this.$data.option.reservation_date_id = reservationDateId;
    },

    handleUpdateReservationTimeId(reservationTimeId: string): void {
      this.$data.option.reservation_time_id = reservationTimeId;
    },

    handleSearch(): void {
      this.isLoading = true;
    },

    handleLoadSucceeded(): void {
      this.isLoading = false;
    },

    handleLoadFailure(): void {
      this.isLoading = false;
      const toastConfig: BNoticeConfig = {
        message: "予約データの取得に失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleLoadSearchDataFailure(): void {
      const toastConfig: BNoticeConfig = {
        message: "データの初期化に失敗しました",
        type: "is-danger"
      };

      // todo: redirect 503 page
      this.$buefy.toast.open(toastConfig);
    }
  },
  data() {
    const option: ReservationSearchOption = {
      reservation_date_id: "",
      reservation_time_id: ""
    };

    return {
      isLoading: false,
      option: option
    };
  }
});
