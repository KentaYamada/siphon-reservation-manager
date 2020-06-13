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
    })
  },
  methods: {
    ...mapActions("reservation", [FETCH_RESERVATION_SEATS, SAVE]),
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
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // something
      } else {
        const toastConfig: ToastConfig = {
          message: "入力内容に誤りがあります。エラーメッセージを確認してください。",
          type: "is-danger"
        };
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
      searchOption: searchOption
    };
  },
  mounted() {
    this.initialize();
  }
});
