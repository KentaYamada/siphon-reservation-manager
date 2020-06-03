import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// component
import SelectableReservationSeatList from "@/components/reservation-seats/selectable-list/SelectableReservationSeatList.vue";

// entity
import { Reservation } from "@/entity/reservation";

// store
import {
  FETCH,
  GET_BY_ID,
  GET_RESERVABLE_PEOPLE,
  GET_RESERVABLE_TIMEZONES,
  HAS_RESERVATION_SEATS,
  HAS_SELECTED_SEATS,
  SET_RESERVATION_DATE,
  SET_RESERVATION_TIMEZONE
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
      HAS_SELECTED_SEATS
    ]),
    ...mapGetters("timezone", {
      timezones: GET_RESERVABLE_TIMEZONES,
      getTimezoneById: GET_BY_ID
    }),

    /**
     * 座席選択を促すメッセージを表示するかどうか
     */
    visibleSelectionSeatMessage(): boolean {
      // 予約座席データあり & 予約可能数が1以上 & 座席未選択
      // todo: gettersに寄せる
      return (
        this.hasReservationSeats &&
        this.getReservablePeople !== 0 &&
        !this.hasSelectedSeats
      );
    },

    /**
     * 予約座席が満席であることをメッセージ表示するかどうか
     */
    visibleFullOfSeatsMessage(): boolean {
      // 予約座席データあり & 予約可能数が1以上 & 座席未選択
      // todo: gettersに寄せる
      return this.hasReservationSeats && this.getReservablePeople === 0;
    }
  },
  methods: {
    ...mapActions("businessDay", {
      fetchBusinessDays: FETCH
    }),
    ...mapActions("timezone", {
      fetchTimezones: FETCH
    }),
    ...mapMutations("reservation", [
      SET_RESERVATION_DATE,
      SET_RESERVATION_TIMEZONE
    ]),

    onChangeBusinessDay(selectedId: string): void {
      const businessDay = this.getBusinessDayById(selectedId);
      this.setReservationDate(businessDay.business_date);
      this.$emit("update-reservation-date", selectedId);
    },

    onChangeTimezone(selectedId: string): void {
      const timezone = this.getTimezoneById(selectedId);
      this.setReservationTimezone(timezone);
      this.$emit("update-reservation-time", selectedId);
    }
  },
  mounted() {
    const promises = [this.fetchTimezones(), this.fetchBusinessDays()];

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
