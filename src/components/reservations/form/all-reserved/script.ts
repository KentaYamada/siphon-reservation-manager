import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";

// component
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";

// entity
import { Reservation } from "@/entity/reservation";

// store
import { CAN_RESERVED, FETCH, FETCH_BUSINESS_DATE_AFTER_TODAY, HAS_RESERVATION_SEATS } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-all-reserved-form/>",
  components: {
    ReservationSeatList
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
    ...mapState("timezone", ["timezones"]),
    ...mapGetters("reservation", [CAN_RESERVED, HAS_RESERVATION_SEATS])
  },
  methods: {
    ...mapActions("businessDay", [FETCH_BUSINESS_DATE_AFTER_TODAY]),
    ...mapActions("timezone", [FETCH]),

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
    const promises = [this.fetchBusinessDateAfterToday(), this.fetch()];

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
