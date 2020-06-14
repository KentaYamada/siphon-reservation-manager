import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// component
import SelectableReservationSeatList from "@/components/reservation-seats/selectable-list/SelectableReservationSeatList.vue";

// entity
import { Reservation } from "@/entity/reservation";

// store
import {
  FETCH,
  FETCH_BUSINESS_DATE_AFTER_TODAY,
  GET_RESERVABLE_PEOPLE,
  GET_RESERVABLE_TIMEZONES,
  HAS_RESERVATION_SEATS,
  HAS_SELECTED_SEATS,
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
    ...mapGetters("reservation", [
      GET_RESERVABLE_PEOPLE,
      HAS_RESERVATION_SEATS,
      HAS_SELECTED_SEATS,
      IS_FULL_OF_RESERVED
    ]),
    ...mapGetters("timezone", { timezones: GET_RESERVABLE_TIMEZONES }),

    /**
     * 座席選択を促すメッセージを表示するかどうか
     */
    visibleSelectionSeatMessage(): boolean {
      return this.hasReservationSeats && !this.isFullOfReserved && !this.hasSelectedSeats;
    }
  },
  methods: {
    ...mapActions("businessDay", [FETCH_BUSINESS_DATE_AFTER_TODAY]),
    ...mapActions("timezone", { fetchTimezones: FETCH }),

    /**
     * 予約日変更イベント
     */
    onChangeBusinessDay(selectedId: string): void {
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
        const toastConfig: ToastConfig = {
          message: "データの初期化に失敗しました。",
          type: "is-danger"
        };
        this.$buefy.toast.open(toastConfig);
      });
  }
});
