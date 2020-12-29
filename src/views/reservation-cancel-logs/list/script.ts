import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import ReservationCancelLogSearchForm from "@/components/reservation-cancel-logs/search-form/ReservationCancelLogSearchForm.vue";
import ReservationCancelLogList from "@/components/reservation-cancel-logs/list/ReservationCancelLogList.vue";
import { ReservationCancelLog } from "@/entity/reservation-cancel-log";
import { ReservationCancelLogSearchOption } from "@/entity/reservation-cancel-log-search-option";
import { ReservationCancelLogService } from "@/services/firestore/reservation-cancel-log-service";

export default Vue.extend({
  components: {
    ReservationCancelLogSearchForm,
    ReservationCancelLogList
  },
  methods: {
    handleSearch(params: ReservationCancelLogSearchOption) {
      this.isLoading = true;

      ReservationCancelLogService.fetch(params).subscribe(
        (items: Array<ReservationCancelLog>) => (this.items = items),
        () => {
          const toastConfig: BNoticeConfig = {
            message: "データの読み込みに失敗しました",
            type: "is-danger"
          };

          this.$buefy.toast.open(toastConfig);
        },
        () => (this.isLoading = false)
      );
    }
  },
  data() {
    return {
      isLoading: false,
      searchOption: {
        cancel_date_from: new Date(),
        cancel_date_to: new Date()
      } as ReservationCancelLogSearchOption,
      items: [] as Array<ReservationCancelLog>
    };
  }
});
