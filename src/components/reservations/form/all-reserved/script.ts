import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

// entity
import { Reservation } from "@/entity/reservation";

// store
import {
  FETCH,
  FETCH_ALL_RESERVED_TIMEZONES,
  GET_BY_ID,
  SET_RESERVATION_DATE,
  SET_RESERVATION_TIMEZONE
} from "@/store/constant";

export default Vue.extend({
  template: "<reservation-all-reserved-form/>",
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
    ...mapGetters("businessDay", {
      getBusinessDayById: GET_BY_ID
    }),
    ...mapGetters("timezone", {
      getTimezoneById: GET_BY_ID
    })
  },
  methods: {
    ...mapActions("businessDay", {
      fetchBusinessDays: FETCH
    }),
    ...mapActions("timezone", [FETCH_ALL_RESERVED_TIMEZONES]),
    ...mapMutations("reservation", [
      SET_RESERVATION_DATE,
      SET_RESERVATION_TIMEZONE
    ]),

    onChangeBusinessDay(selectedId: string): void {
      const businessDay = this.getBusinessDayById(selectedId);
      this.setReservationDate(businessDay.business_date);
    },

    onChangeTimezone(selectedId: string): void {
      const timezone = this.getTimezoneById(selectedId);
      this.setReservationTimezone(timezone);
    }
  },
  mounted() {
    this.fetchAllReservedTimezones();
    this.fetchBusinessDays();
  }
});
