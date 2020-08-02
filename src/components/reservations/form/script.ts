import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import { required, email } from "vuelidate/lib/validators";
import { tel } from "@/plugins/validate";
import _ from "lodash";
import SelectableReservationSeatList from "@/components/reservation-seats/selectable-list/SelectableReservationSeatList.vue";
import { Reservation } from "@/entity/reservation";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { formatDateJp } from "@/filters/format-date-jp";
import { timePeriod } from "@/filters/time-period";
import {
  FETCH,
  FETCH_BUSINESS_DATE_AFTER_TODAY,
  FETCH_BY_ID,
  FETCH_RESERVATION_SEATS,
  GET_BY_ID,
  GET_RESERVABLE_PEOPLE,
  GET_RESERVABLE_TIMEZONES,
  GET_SELECTABLE_TIMEZONES,
  GET_TIMEZONES_BY_RESERVATION_DATE,
  HAS_RESERVATION_SEATS,
  HAS_SELECTED_SEATS,
  INITIALIZE,
  INITIALIZE_RESERVATION_SEATS,
  RESET_RESERVATION_TIMEZONE,
  RESET_RESERVATION_SEATS,
  SAVE,
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
    id: {
      required: false,
      type: String,
      default: ""
    }
  },
  validations: {
    reservation: {
      reservation_date: {
        required
      },
      reservation_start_time: {
        required
      },
      reserver_name: {
        required
      },
      number_of_reservations: {
        required
      },
      tel: {
        required,
        tel
      },
      mail: {
        required,
        email
      }
    }
  },
  computed: {
    ...mapState("businessDay", ["businessDays"]),
    ...mapState("reservation", ["reservation"]),
    ...mapGetters("businessDay", {
      getBusinessDayById: GET_BY_ID,
      getSelectableTimezones: GET_SELECTABLE_TIMEZONES
    }),
    ...mapGetters("reservation", [
      GET_RESERVABLE_PEOPLE,
      HAS_RESERVATION_SEATS,
      HAS_SELECTED_SEATS,
      IS_FULL_OF_RESERVED
    ]),
    ...mapGetters("timezone", {
      timezones: GET_RESERVABLE_TIMEZONES,
      getTimezoneById: GET_BY_ID
    }),

    timezones(): Array<SelectableTimezone> {
      return this.getSelectableTimezones(this.reservation.reservation_date_id);
    },

    visibleSelectionSeatMessage(): boolean {
      return this.hasReservationSeats && !this.isFullOfReserved && !this.hasSelectedSeats;
    }
  },
  methods: {
    ...mapActions("businessDay", {
      fetchBusinessDateAfterToday: FETCH_BUSINESS_DATE_AFTER_TODAY
    }),
    ...mapActions("reservation", {
      fetchById: FETCH_BY_ID,
      fetchReservationSeats: FETCH_RESERVATION_SEATS,
      save: SAVE
    }),
    ...mapMutations("reservation", {
      initialize: INITIALIZE,
      initializeReservationSeats: INITIALIZE_RESERVATION_SEATS,
      resetReservationSeats: RESET_RESERVATION_SEATS,
      resetReservationTimezone: RESET_RESERVATION_TIMEZONE,
      setReservationDate: SET_RESERVATION_DATE,
      setReservationTimezone: SET_RESERVATION_TIMEZONE
    }),

    handleUpdateReservationDate(selectedId: string): void {
      const businessDay = this.getBusinessDayById(selectedId);
      this.setReservationDate(businessDay.business_date);
      this.resetReservationTimezone();
      this.option.reservation_date_id = selectedId;
      this.option.reservation_time_id = "";
    },

    handleUpdateReservationTimezone(selectedId: string): void {
      const timezone = this.getTimezoneById(selectedId);
      this.setReservationTimezone(timezone);
      this.option.reservation_time_id = selectedId;
    },

    handleSave(): void {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.$emit("validation-failure");
      } else {
        this.save(this.reservation)
          .then(() => {
            this.$emit("save-succeeded");
          })
          .catch(error => {
            this.$emit("save-failure", error);
          });
      }
    },

    _fetchReservationSeats(): void {
      const hasSearchOption =
        !_.isEmpty(this.option.reservation_date_id) && !_.isEmpty(this.option.reservation_time_id);

      if (hasSearchOption) {
        this.initializeReservationSeats();
        this.fetchReservationSeats(this.option);
      } else {
        this.resetReservationSeats();
      }
    }
  },
  filters: {
    formatDateJp,
    timePeriod
  },
  data() {
    const option: ReservationSeatSearchOption = {
      reservation_id: "",
      reservation_date_id: "",
      reservation_time_id: ""
    };

    return {
      isLoadingSeats: false,
      isSaving: false,
      option: option
    };
  },
  created() {
    this.initialize();
    this.$emit("initializing");
  },
  mounted() {
    const promises = [this.fetchBusinessDateAfterToday()];

    if (!_.isEmpty(this.id)) {
      promises.push(this.fetchById(this.id));
    }

    Promise.all(promises)
      .then(() => {
        this.$emit("initialized");
      })
      .catch(() => {
        this.$emit("initialize-failure");
      });
  }
});
