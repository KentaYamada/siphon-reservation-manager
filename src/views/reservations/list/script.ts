import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import _ from "lodash";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import ReservationList from "@/components/reservations/list/ReservationList.vue";
import ReservationSearchForm from "@/components/reservations/search/ReservationSearchForm.vue";
import { FETCH, SET_ITEMS } from "@/store/constant";

export default Vue.extend({
  components: {
    ReservationList,
    ReservationSearchForm
  },
  computed: {
    ...mapState("reservationList", ["reservationList"])
  },
  methods: {
    ...mapActions("reservationList", { fetch: FETCH }),
    ...mapMutations("reservationList", { setItems: SET_ITEMS }),

    handleSearch(option: ReservationSearchOption): void {
      this.option = option;
      this._fetch(this.option);
    },

    handleInitializeFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "データの初期化に失敗しました",
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
      this._fetch(this.option);
    },

    handleCancelFailed() {
      const toastConfig: BNoticeConfig = {
        message: "予約の取り消しに失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    _fetch(option: ReservationSearchOption) {
      if (!_.isEmpty(option.reservation_date_id)) {
        this.isLoading = true;
        this.fetch(option)
          .catch(() => {
            const toastConfig: BNoticeConfig = {
              message: "データの読み込みに失敗しました",
              type: "is-danger"
            };
            this.$buefy.toast.open(toastConfig);
          })
          .finally(() => (this.isLoading = false));
      }
    }
  },
  created() {
    this.setItems([]);
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
