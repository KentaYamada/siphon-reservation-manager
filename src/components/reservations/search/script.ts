import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { formatDateJp } from "@/filters/format-date-jp";
import { timePeriod } from "@/filters/time-period";
import { FETCH_BUSINESS_DATE_AFTER_TODAY, GET_SELECTABLE_TIMEZONES } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-search-form/>",
  computed: {
    ...mapState("businessDay", ["businessDays"]),
    ...mapGetters("businessDay", {
      getSelectableTimezones: GET_SELECTABLE_TIMEZONES
    }),

    timezones(): Array<SelectableTimezone> {
      return this.getSelectableTimezones(this.option.reservation_date_id);
    }
  },
  methods: {
    ...mapActions("businessDay", {
      fetch: FETCH_BUSINESS_DATE_AFTER_TODAY
    }),

    handleChangeReservationDate() {
      this.option.reservation_time_id = "";
    },

    handleSearch(): void {
      this.$emit("search", this.option);
    }
  },
  filters: {
    formatDateJp,
    timePeriod
  },
  data() {
    const option: ReservationSearchOption = {
      reservation_date_id: "",
      reservation_time_id: ""
    };

    return {
      option: option
    };
  },
  mounted() {
    this.fetch().catch(() => {
      this.$emit("load-search-data-failure");
    });
  }
});
