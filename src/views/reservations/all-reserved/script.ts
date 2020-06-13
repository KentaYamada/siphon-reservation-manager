import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";
import { required, email } from "vuelidate/lib/validators";

// component
import ReservationAllReservedForm from "@/components/reservations/form/all-reserved/ReservationAllReservedForm.vue";

// entity
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";

// plugin
import { tel } from "@/plugins/validate";

// store
import {
  CAN_RESERVED,
  GET_BY_ID,
  FETCH_RESERVATION_SEATS,
  INITIALIZE,
  INITIALIZE_RESERVATION_SEATS,
  RESET_RESERVATION_SEATS,
  SAVE,
  SAVE_ALL_RESERVATION,
  SET_RESERVATION_DATE,
  SET_RESERVATION_TIMEZONE
} from "@/store/constant";

export default Vue.extend({
  components: {
    ReservationAllReservedForm
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
    ...mapState("reservation", ["reservation"]),
    ...mapGetters("reservation", [CAN_RESERVED]),
    ...mapGetters("businessDay", {
      getBusinessDayById: GET_BY_ID
    }),
    ...mapGetters("timezone", {
      getTimezoneById: GET_BY_ID
    }),

    canSave(): boolean {
      return this.canReserved && !this.isSaving;
    }
  },
  methods: {
    ...mapActions("reservation", [FETCH_RESERVATION_SEATS, SAVE, SAVE_ALL_RESERVATION]),
    ...mapMutations("reservation", [
      INITIALIZE,
      INITIALIZE_RESERVATION_SEATS,
      RESET_RESERVATION_SEATS,
      SET_RESERVATION_DATE,
      SET_RESERVATION_TIMEZONE
    ]),

    /**
     * 保存イベント
     */
    onClickSave(): void {
      const toastConfig: ToastConfig = {
        message: "",
        type: ""
      };

      this.isSaving = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveAllReservation(this.reservation)
          .then((newId: string) => {
            toastConfig.message = "貸切予約しました。";
            toastConfig.type = "is-success";

            this.$buefy.toast.open(toastConfig);
            this.$router.push({ name: "reserved-message", params: { id: newId } });
          })
          .catch(() => {
            toastConfig.message = "貸切予約の保存に失敗しました。";
            toastConfig.type = "is-success";

            this.$buefy.toast.open(toastConfig);
          })
          .finally(() => {
            this.isSaving = false;
          });
      } else {
        toastConfig.message = "入力内容に誤りがあります。エラーメッセージを確認してください。";
        toastConfig.type = "is-danger";

        this.isSaving = false;
        this.$buefy.toast.open(toastConfig);
      }
    },

    /**
     * データ読込完了イベント
     */
    onDataLoaded(): void {
      this.isLoading = false;
    },

    /**
     * 予約日変更イベント
     */
    onUpdateReservationDate(selectedId: string): void {
      const businessDay = this.getBusinessDayById(selectedId);
      this.setReservationDate(businessDay);
      this.searchOption.reservation_date_id = selectedId;
      this.__fetchReservationSeats();
    },

    /**
     * 予約時間変更イベント
     */
    onUpdateReservationTime(selectedId: string): void {
      const timezone = this.getTimezoneById(selectedId);
      this.setReservationTimezone(timezone);
      this.searchOption.reservation_time_id = selectedId;
      this.__fetchReservationSeats();
    },

    /**
     * 予約座席取得
     */
    __fetchReservationSeats(): void {
      const hasOption = this.searchOption.reservation_date_id !== "" && this.searchOption.reservation_time_id !== "";

      if (hasOption) {
        this.initializeReservationSeats();
        this.fetchReservationSeats(this.searchOption);
      } else {
        this.resetReservationSeats();
      }
    }
  },
  data() {
    const searchOption: ReservationSeatSearchOption = {
      reservation_id: "",
      reservation_date_id: "",
      reservation_time_id: ""
    };

    return {
      isLoading: true,
      isSaving: false,
      searchOption: searchOption
    };
  },
  mounted() {
    this.initialize();
  }
});
