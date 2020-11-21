import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { tap } from "rxjs/operators";
import { required, email } from "vuelidate/lib/validators";
import { tel } from "@/plugins/validate";
import _ from "lodash";
import SelectableReservationSeatList from "@/components/reservation-seats/selectable-list/SelectableReservationSeatList.vue";
import { Reservation } from '@/entity/reservation';
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { formatDateJp } from "@/filters/format-date-jp";
import { timePeriod } from "@/filters/time-period";
import { ReservationService } from "@/services/firestore/reservation-service";
import {
  FETCH_RESERVATION_SEATS,
  FETCH_RESERVABLE_BUSINESS_DAYS,
  GET_BY_ID,
  GET_RESERVABLE_PEOPLE,
  GET_SELECTABLE_TIMEZONES,
  GET_SELECTED_TIMEZONE,
  HAS_RESERVATION_SEATS,
  HAS_SELECTED_SEATS,
  INITIALIZE_RESERVATION_SEATS,
  RESET_RESERVATION_SEATS,
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
      fetchReservationSeats: FETCH_RESERVATION_SEATS
    }),
    ...mapMutations("reservation", {
      initializeReservationSeats: INITIALIZE_RESERVATION_SEATS,
      resetReservationSeats: RESET_RESERVATION_SEATS
    }),

    handleUpdateReservationDate(selectedId: string): void {
      this.reservation.reservation_date = this.getBusinessDayById(selectedId).business_date;
      this.reservation.reservation_end_time = null;
      this.reservation.reservation_start_time = null;
      this.reservation.reservation_time_id = "";
      this.option.reservation_date_id = selectedId;
      this.option.reservation_time_id = "";
      this._fetchReservationSeats();
    },

    handleUpdateReservationTimezone(selectedId: string): void {
      const timezone = this.getSelectedTimezone(this.option.reservation_date_id, selectedId);
      this.reservation.reservation_end_time = timezone.end_time;
      this.reservation.reservation_start_time = timezone.start_time;
      this.option.reservation_time_id = selectedId;
      this._fetchReservationSeats();
    },

    handleSave() {
      this.$v.$touch();

      // if (!this.$v.$invalid && this.hasSelectedSeats) {
      if (!this.$v.$invalid) {
        // this.$emit("update-progress", true);
        console.log(this.reservation);

        ReservationService.save(this.reservation)
          .pipe(tap(() => this.$emit("update-progress", false)))
          .subscribe(
            (snapshot) => this.$emit("save-succeeded", snapshot.id),
            (error) => console.log(error)
          );
      } else {
        this.$emit("validation-failed");
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
    const reservation: Reservation = {
      reservation_date: null,
      reservation_date_id: "",
      reservation_start_time: null,
      reservation_end_time: null,
      reservation_time_id: "",
      reserver_name: "",
      reservation_seats: [],
      number_of_reservations: null,
      tel: "",
      mail: "",
      comment: ""
    };
    const option: ReservationSeatSearchOption = {
      reservation_id: "",
      reservation_date_id: "",
      reservation_time_id: ""
    };

    return {
      isLoadingSeats: false,
      isSaving: false,
      option: option,
      reservation: reservation
    };
  },
  created() {
    this.fetchReservableBusinessDays()
      .then(() => {
        this.option.reservation_id = this.id;
        this.option.reservation_date_id = this.reservation.reservation_date_id;
        this.option.reservation_time_id = this.reservation.reservation_time_id;
      })
      .catch(() => {
        this.$emit("initialize-failed");
      });
  },
  mounted() {
    if (this.id) {
      ReservationService.fetchById(this.id)
        .pipe(tap(() => this.$emit("initialized", false)))
        .subscribe(
          (reservation: Reservation) => console.log(reservation),
          () => this.$emit("load-failed")
        )
    }
  }
});
