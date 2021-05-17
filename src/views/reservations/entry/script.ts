import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import { tel } from "@/plugins/validate";
import NewYearDishesReservationEntryLink from "@/components/new-year-dishes-reservations/entry-link/NewYearDishesReservationEntryLink.vue";
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { numberOfReservations } from "@/plugins/validations/number-of-reservations";
import {
  FETCH_RESERVABLE_BUSINESS_DAYS,
  FETCH_RESERVATION_SEATS,
  GET_BY_ID,
  GET_RESERVABLE_PEOPLE,
  GET_SELECTABLE_TIMEZONES,
  GET_SELECTED_TIMEZONE,
  HAS_RESERVATION_DATETIME,
  INITIALIZE,
  IS_FULL_OF_RESERVATIONS,
  IS_SELECTED_SEATS,
  SAVE,
  SELECTED_SEAT_COUNT,
  UPDATE_COMMENT,
  UPDATE_NUMBER_OF_RESERVATIONS,
  UPDATE_MAIL,
  UPDATE_RESERVATION_DATE,
  UPDATE_RESERVATION_SEAT,
  UPDATE_RESERVATION_TIME,
  UPDATE_RESERVER_NAME,
  UPDATE_TEL
} from "@/store/constant";

/**
 * Reservation entry view
 */
export default Vue.extend({
  name: "reservation-entry-view",
  components: {
    NewYearDishesReservationEntryLink,
    ReservationForm
  },
  data() {
    return {
      isLoading: false,
      isLoadingSeats: false
    };
  },
  computed: {
    ...mapState("businessDay", ["businessDays"]),

    ...mapState("reservation", ["reservation"]),

    ...mapGetters("businessDay", {
      getBusinessDayById: GET_BY_ID,
      getSelectableTimezones: GET_SELECTABLE_TIMEZONES,
      getSelectedTimezone: GET_SELECTED_TIMEZONE
    }),

    ...mapGetters("reservation", {
      hasReservationDateTime: HAS_RESERVATION_DATETIME,
      isFullOfReservations: IS_FULL_OF_RESERVATIONS,
      isSelectedSeats: IS_SELECTED_SEATS,
      reservablePeople: GET_RESERVABLE_PEOPLE,
      selectedSeatCount: SELECTED_SEAT_COUNT
    }),

    timezones(): Array<SelectableTimezone> {
      return this.getSelectableTimezones(this.reservation.reservation_date_id);
    }
  },
  created() {
    this.initialize();
  },
  mounted() {
    this.isLoading = true;
    this.fetchReservableBusinessDays()
      .catch(() => this._handleFailed("データの取得に失敗しました"))
      .finally(() => (this.isLoading = false));
  },
  methods: {
    ...mapActions("businessDay", {
      fetchReservableBusinessDays: FETCH_RESERVABLE_BUSINESS_DAYS
    }),

    ...mapActions("reservation", {
      fetchReservationSeats: FETCH_RESERVATION_SEATS,
      save: SAVE
    }),

    ...mapMutations("reservation", {
      initialize: INITIALIZE,
      updateComment: UPDATE_COMMENT,
      updateMail: UPDATE_MAIL,
      updateNumberOfReservations: UPDATE_NUMBER_OF_RESERVATIONS,
      updateReservationDate: UPDATE_RESERVATION_DATE,
      updateReservationSeat: UPDATE_RESERVATION_SEAT,
      updateReservationTime: UPDATE_RESERVATION_TIME,
      updateReserverName: UPDATE_RESERVER_NAME,
      updateTel: UPDATE_TEL
    }),

    handleSave(): void {
      this.$v.$touch();

      if (this.$v.$invalid || !this.isSelectedSeats) {
        this._handleFailed("入力内容に誤りがあります。エラーメッセージをご確認ください");
      } else {
        this.isLoading = true;
        this.save(this.reservation)
          .then((id: string) => {
            this._handleSucceeded("予約しました");
            this.$router.push({ name: "reserved-message", params: { id: id } });
          })
          .catch(err => {
            let message = "予約することができませんでした";

            if (err.refetch_seats) {
              message = err.message;
              this._fetchReservationSeats();
            }

            this._handleFailed(message);
          })
          .finally(() => (this.isLoading = false));
      }
    },

    handleUpdateComment(comment: string): void {
      this.updateComment(comment);
    },

    handleUpdateNumberOfReservations(numberOfReservations: number): void {
      this.updateNumberOfReservations(numberOfReservations);
    },

    handleUpdateMail(mail: string): void {
      this.updateMail(mail);
    },

    handleUpdateReservationDate(reservationDateId: string): void {
      const businessDay = this.getBusinessDayById(reservationDateId);
      this.updateReservationDate(businessDay);
    },

    handleUpdateReservationSeat(seatNo: number): void {
      this.updateReservationSeat(seatNo);
    },

    handleUpdateReservationTime(reservationTimeId: string): void {
      const timezone = this.getSelectedTimezone(this.reservation.reservation_date_id, reservationTimeId);
      this.updateReservationTime(timezone);
      this._fetchReservationSeats();
    },

    handleUpdateReserverName(reserverName: string): void {
      this.updateReserverName(reserverName);
    },

    handleUpdateTel(tel: string): void {
      this.updateTel(tel);
    },

    _fetchReservationSeats(): void {
      const options: ReservationSearchOption = {
        reservation_date_id: this.reservation.reservation_date_id,
        reservation_time_id: this.reservation.reservation_time_id
      };

      this.isLoadingSeats = true;
      this.fetchReservationSeats(options)
        .catch(() => this._handleFailed("座席データの取得に失敗しました"))
        .finally(() => (this.isLoadingSeats = false));
    },

    _handleFailed(message: string): void {
      const config: BNoticeConfig = {
        message: message,
        type: "is-danger"
      };

      this.$buefy.toast.open(config);
    },

    _handleSucceeded(message: string): void {
      const config: BNoticeConfig = {
        message: message,
        type: "is-success"
      };

      this.$buefy.toast.open(config);
    }
  },
  validations() {
    return {
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
          required,
          numberOfReservations: numberOfReservations(this.reservation.reservation_seats)
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
    };
  }
});
