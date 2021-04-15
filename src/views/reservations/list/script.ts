import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { BDialogConfig, BNoticeConfig } from "buefy/types/components";
import ReservationList from "@/components/reservations/list/ReservationList.vue";
import ReservationSearchForm from "@/components/reservations/search-form/ReservationSearchForm.vue";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import {
  CANCEL,
  FETCH,
  FETCH_BUSINESS_DATE_AFTER_TODAY,
  GET_SELECTABLE_TIMEZONES,
  HAS_ITEMS,
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

    ...mapState("reservationByDateTime", ["reservations", "searchOption"]),

    ...mapGetters("businessDay", {
      getSelectableTimezones: GET_SELECTABLE_TIMEZONES
    }),

    ...mapGetters("reservationByDateTime", {
      hasItems: HAS_ITEMS
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

    ...mapActions("reservation", {
      cancel: CANCEL
    }),

    ...mapActions("reservationByDateTime", {
      fetch: FETCH
    }),

    ...mapMutations("reservationByDateTime", {
      setItems: SET_ITEMS,
      updateReservationDate: UPDATE_RESERVATION_DATE,
      updateReservationTime: UPDATE_RESERVATION_TIME
    }),

    handleSearch(): void {
      this._fetch();
    },

    handleCancel(id: string): void {
      const message = `
            <p>予約を取消しますか？</p>
            <small>取消した予約は元に戻せません</small>
          `;
      const dialogConfig: BDialogConfig = {
        type: "is-danger",
        message: message,
        confirmText: "はい",
        cancelText: "いいえ",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle",
        onConfirm: () => {
          this.cancel(id)
            .then(() => {
              this._showSuccessToast("予約取り消しました");
              this._fetch();
            })
            .catch(() => {
              this._showDangerToast("予約の取り消しに失敗しました");
            });
        }
      };

      this.$buefy.dialog.confirm(dialogConfig);
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
