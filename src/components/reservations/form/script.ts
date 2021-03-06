import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import { tel } from "@/plugins/validate";
import _ from "lodash";
import SelectableReservationSeatList from "@/components/reservation-seats/selectable-list/SelectableReservationSeatList.vue";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { formatDateJp } from "@/filters/format-date-jp";
import { timePeriod } from "@/filters/time-period";
import {
  FETCH_BY_ID,
  FETCH_RESERVATION_SEATS,
  FETCH_RESERVABLE_BUSINESS_DAYS,
  GET_BY_ID,
  GET_RESERVABLE_PEOPLE,
  GET_SELECTABLE_TIMEZONES,
  GET_SELECTED_TIMEZONE,
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
    ...mapGetters("businessDay", {
      getSelectedTimezone: GET_SELECTED_TIMEZONE
    }),
    ...mapGetters("reservation", {
      getReservablePeople: GET_RESERVABLE_PEOPLE,
      hasReservationSeats: HAS_RESERVATION_SEATS,
      hasSelectedSeats: HAS_SELECTED_SEATS,
      isFullOfReserved: IS_FULL_OF_RESERVED
    }),

    timezones(): Array<SelectableTimezone> {
      return this.getSelectableTimezones(this.reservation.reservation_date_id);
    },

    visibleSelectionSeatMessage(): boolean {
      return this.hasReservationSeats && !this.isFullOfReserved && !this.hasSelectedSeats;
    },

    buttonText(): string {
      return _.isEmpty(this.id) ? "予約する" : "予約内容を変更する";
    }
  },
  methods: {
    ...mapActions("businessDay", {
      fetchReservableBusinessDays: FETCH_RESERVABLE_BUSINESS_DAYS
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
      this.option.reservation_date_id = selectedId;
      this.option.reservation_time_id = "";
      this.resetReservationTimezone();

      const businessDay = this.getBusinessDayById(selectedId);
      const selectedDate = businessDay ? businessDay.business_date : null;
      this.setReservationDate(selectedDate);
      this.resetReservationSeats();
    },

    handleUpdateReservationTimezone(selectedId: string): void {
      this.option.reservation_time_id = selectedId;

      if (selectedId === "") {
        this.resetReservationTimezone();
        this.resetReservationSeats();
      } else {
        const timezone = this.getSelectedTimezone(this.option.reservation_date_id, selectedId);
        this.setReservationTimezone(timezone);
        this._fetchReservationSeats();
      }
    },

    handleSave(): void {
      this.$v.$touch();

      if (this.$v.$invalid || !this.hasSelectedSeats) {
        this.$emit("validation-failure");
      } else {
        this.isSaving = true;
        this.save(this.reservation)
          .then((id: string) => {
            this.$emit("save-succeeded", id);
          })
          .catch(error => {
            this.$emit("save-failure", error);

            if (error.refetch_seats) {
              this._fetchReservationSeats();
            }
          })
          .finally(() => {
            this.isSaving = false;
          });
      }
    },

    _fetchReservationSeats(): void {
      this.isLoadingSeats = true;
      this.resetReservationSeats();

      if (!_.isEmpty(this.option.reservation_date_id) && !_.isEmpty(this.option.reservation_time_id)) {
        this.initializeReservationSeats();
        this.fetchReservationSeats(this.option)
          .catch(() => {
            this.$emit("load-reservation-seats-failure");
          })
          .finally(() => {
            this.isLoadingSeats = false;
          });
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
    const promises = [this.fetchReservableBusinessDays()];

    if (!_.isEmpty(this.id)) {
      promises.push(this.fetchById(this.id));
    }

    Promise.all(promises)
      .then(() => {
        // todo: refactoring
        this.option.reservation_id = this.id;
        this.option.reservation_date_id = this.reservation.reservation_date_id;
        this.option.reservation_time_id = this.reservation.reservation_time_id;
        this.$emit("initialized");
      })
      .catch(() => {
        this.$emit("initialize-failure");
      });
  }
});
