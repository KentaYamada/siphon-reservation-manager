import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";

// component
import SelectableReservationSeatList from "@/components/reservation-seats/selectable-list/SelectableReservationSeatList.vue";

// entity
import { Reservation } from "@/entity/reservation";
import { Timezone } from "@/entity/timezone";

// store
import {
  FETCH,
  FETCH_BUSINESS_DATE_AFTER_TODAY,
  GET_BY_ID,
  GET_RESERVABLE_PEOPLE,
  GET_RESERVABLE_TIMEZONES,
  GET_TIMEZONES_BY_RESERVATION_DATE,
  HAS_RESERVATION_SEATS,
  HAS_SELECTED_SEATS,
  RESET_RESERVATION_TIMEZONE,
  SET_RESERVATION_DATE,
  SET_RESERVATION_TIMEZONE,
  IS_FULL_OF_RESERVED
} from "@/store/constant";

export default Vue.extend({
  template: "<reservation-form/>",
  components: {
    SelectableReservationSeatList
  },
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    },
    validations: {
      required: true,
      type: Object
    },
    isLoadingSeats: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    ...mapState("businessDay", ["businessDays"]),
    ...mapGetters("businessDay", {
      getBusinessDayById: GET_BY_ID
    }),
    ...mapGetters("reservation", [
      GET_RESERVABLE_PEOPLE,
      HAS_RESERVATION_SEATS,
      HAS_SELECTED_SEATS,
      IS_FULL_OF_RESERVED
    ]),
    ...mapGetters("timezone", {
      timezones: GET_RESERVABLE_TIMEZONES,
      getTimezonesByReservationDate: GET_TIMEZONES_BY_RESERVATION_DATE,
      getTimezoneById: GET_BY_ID
    }),

    reservableTimezones(): Timezone[] {
      if (this.reservation && this.reservation.reservation_date) {
        return this.getTimezonesByReservationDate(this.reservation.reservation_date);
      }

      return this.timezones;
    },

    /**
     * 座席選択を促すメッセージを表示するかどうか
     */
    visibleSelectionSeatMessage(): boolean {
      return this.hasReservationSeats && !this.isFullOfReserved && !this.hasSelectedSeats;
    }
  },
  methods: {
    ...mapActions("businessDay", [FETCH_BUSINESS_DATE_AFTER_TODAY]),
    ...mapActions("timezone", {
      fetchTimezones: FETCH
    }),
    ...mapMutations("reservation", [RESET_RESERVATION_TIMEZONE, SET_RESERVATION_DATE, SET_RESERVATION_TIMEZONE]),

    /**
     * 予約日変更イベント
     */
    onChangeBusinessDay(selectedId: string): void {
      const businessDay = this.getBusinessDayById(selectedId);
      this.setReservationDate(businessDay.business_date);
      this.resetReservationTimezone();
      this.$emit("update-reservation-date", selectedId);
    },

    /**
     * 予約時間変更イベント
     */
    onChangeTimezone(selectedId: string): void {
      this.$emit("update-reservation-time", selectedId);
    }
  },
  mounted() {
    const promises = [this.fetchTimezones(), this.fetchBusinessDateAfterToday()];

    Promise.all(promises)
      .then(() => {
        this.$emit("data-loaded");
      })
      .catch(() => {
        const toastConfig: BNoticeConfig = {
          message: "データの初期化に失敗しました。",
          type: "is-danger"
        };
        this.$buefy.toast.open(toastConfig);
      });
  }
});
