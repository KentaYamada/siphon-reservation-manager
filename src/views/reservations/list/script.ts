import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import ReservationList from "@/components/reservations/list/ReservationList.vue";
import ReservationSearchForm from "@/components/reservations/search-form/ReservationSearchForm.vue";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import {
  FETCH,
  FETCH_BUSINESS_DATE_AFTER_TODAY,
  GET_SELECTABLE_TIMEZONES,
  SET_ITEMS,
  UPDATE_RESERVATION_DATE,
  UPDATE_RESERVATION_TIME
} from "@/store/constant";

/**
 * Reservation list view
 */
export default Vue.extend({
  name: "reservation-list-view",
  components: {
    ReservationList,
    ReservationSearchForm
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapState("businessDay", ["businessDays"]),

    ...mapState("reservationList", ["reservationList", "searchOption"]),

    ...mapGetters("businessDay", {
      getSelectableTimezones: GET_SELECTABLE_TIMEZONES
    }),

    timezones(): Array<SelectableTimezone> {
      return this.getSelectableTimezones(this.searchOption.reservation_date_id);
    }
  },
  created() {
    this.setItems([]);
    this.fetchBusinessDates().catch(() => this._showDangerToast("データの初期化に失敗しました"));
  },
  methods: {
    ...mapActions("businessDay", {
      fetchBusinessDates: FETCH_BUSINESS_DATE_AFTER_TODAY
    }),
    ...mapActions("reservationList", {
      fetch: FETCH
    }),

    ...mapMutations("reservationList", {
      setItems: SET_ITEMS,
      updateReservationDate: UPDATE_RESERVATION_DATE,
      updateReservationTime: UPDATE_RESERVATION_TIME
    }),

    handleSearch(): void {
      this._fetch();
    },

    handleCancelSucceeded(): void {
      this._showSuccessToast("予約取り消しました");
      this._fetch();
    },

    handleCancelFailed(): void {
      this._showDangerToast("予約の取り消しに失敗しました");
    },

    handleUpdateReservationDate(reservationDateId: string): void {
      this.updateReservationDate(reservationDateId);
    },

    handleUpdateReservationTime(reservationTimeId: string): void {
      this.updateReservationTime(reservationTimeId);
    },

    _fetch(): void {
      if (this.searchOption.reservation_date_id !== "") {
        this.isLoading = true;
        this.fetch(this.searchOption)
          .catch(() => this._showDangerToast("データの読み込みに失敗しました"))
          .finally(() => (this.isLoading = false));
      }
    },

    _showDangerToast(message: string): void {
      const config: BNoticeConfig = {
        message: message,
        type: "is-danger"
      };

      this.$buefy.toast.open(config);
    },

    _showSuccessToast(message: string): void {
      const config: BNoticeConfig = {
        message: message,
        type: "is-success"
      };

      this.$buefy.toast.open(config);
    }
  }
});
