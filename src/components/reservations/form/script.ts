import Vue from "vue";
import _ from "lodash";
import { mapActions, mapGetters, mapState } from "vuex";
import { tap } from "rxjs/operators";
import { required, email } from "vuelidate/lib/validators";
import { tel } from "@/plugins/validate";
import SelectableReservationSeatList from "@/components/reservation-seats/selectable-list/SelectableReservationSeatList.vue";
import { Reservation } from '@/entity/reservation';
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { formatDateJp } from "@/filters/format-date-jp";
import { timePeriod } from "@/filters/time-period";
import { ReservationService } from "@/services/firestore/reservation-service";
import {
  FETCH_RESERVABLE_BUSINESS_DAYS,
  GET_BY_ID,
  GET_SELECTABLE_TIMEZONES,
  GET_SELECTED_TIMEZONE
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

    timezones(): Array<SelectableTimezone> {
      return this.getSelectableTimezones(this.reservation.reservation_date_id);
    },

    visibleSelectionSeatMessage(): boolean {
      return this.hasReservationSeats && !this.isFullOfReservation && !this.hasSelectedSeats;
    },

    buttonText(): string {
      return this.id ? "予約する" : "予約内容を変更する";
    },

    hasReservationSeats(): boolean {
      return this.reservation.reservation_seats.length > 0;
    },

    reservablePeople(): number {
      if (!this.reservation) {
        return 0;
      }

      return 1;
    },

    hasSelectedSeats(): boolean {
      if (!this.reservation) {
        return false;
      }

      return this.reservation.reservation_seats.filter(seat => seat.is_selected).length > 0;
    },

    isFullOfReservation(): boolean {
      if (!this.reservation) {
        return false;
      }

      return this.reservation.reservation_seats.filter(seat => seat.is_reserved).length === 8;
    }
  },
  methods: {
    ...mapActions("businessDay", {
      fetchReservableBusinessDays: FETCH_RESERVABLE_BUSINESS_DAYS
    }),

    handleSave() {
      this.$v.$touch();

      if (!this.$v.$invalid && this.hasSelectedSeats) {
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

    handleUpdateSeat(selected: boolean, seatNo: number) {
      this.seats.forEach((seat: ReservationSeat) => {
        if (seatNo === seat.seat_no) {
          seat.is_selected = selected;
        }
      });

      if (selected) {
        this.reservation.seats.push(seatNo);
      } else {
        this.reservation.seats = this.reservation.seats.filter(seat => seat !== seatNo);
      }

      this.reservation.seats = this.reservation.seats.sort();
      console.log(this.reservation.seats);
    },

    handleUpdateReservationDate(selectedId: string): void {
      this.reservation.reservation_date = this.getBusinessDayById(selectedId).business_date;
      this.reservation.reservation_end_time = null;
      this.reservation.reservation_start_time = null;
      this.reservation.reservation_time_id = "";
      this.searchParams.reservation_date_id = selectedId;
      this._fetchReservationSeats();
    },

    handleUpdateReservationTimezone(selectedId: string): void {
      const timezone = this.getSelectedTimezone(this.searchParams.reservation_date_id, selectedId);
      this.reservation.reservation_end_time = timezone.end_time;
      this.reservation.reservation_start_time = timezone.start_time;
      this.searchParams.reservation_time_id = selectedId;
      this._fetchReservationSeats();
    },

    _fetchReservationSeats() {
      this.isLoadingSeats = true;

      ReservationService.fetchSeats(this.searchParams)
        .pipe(tap(() => this.isLoadingSeats = false))
        .subscribe(
            (seats: Array<ReservationSeat>) => {
              this.reservation.reservation_seats = seats;
              this.seats = seats;
            },
            (error) => console.error(error)
        );
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
      comment: "",
      seats: []
    };
    const searchParams: ReservationSeatSearchOption = {
      reservation_date_id: "",
      reservation_id: "",
      reservation_time_id: ""
    };
    const seats = [] as Array<ReservationSeat>;

    return {
      isLoadingSeats: false,
      isSaving: false,
      searchParams: searchParams,
      reservation: reservation,
      seats: seats
    };
  },
  created() {
    this.fetchReservableBusinessDays()
      .then(() => {
        this.searchParams.reservation_id = this.id;
        this.searchParams.reservation_date_id = this.reservation.reservation_date_id;
        this.searchParams.reservation_time_id = this.reservation.reservation_time_id;
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
