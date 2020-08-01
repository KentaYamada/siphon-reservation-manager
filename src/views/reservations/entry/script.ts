import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";

// component
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

// entity
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";

// plugin
import _ from "lodash";
import { required, email } from "vuelidate/lib/validators";
import { tel } from "@/plugins/validate";

// store
import {
  FETCH_RESERVATION_SEATS,
  GET_BY_ID,
  INITIALIZE,
  INITIALIZE_RESERVATION_SEATS,
  HAS_SELECTED_SEATS,
  RESET_RESERVATION_SEATS,
  SAVE,
  SET_RESERVATION_DATE,
  SET_RESERVATION_TIMEZONE
} from "@/store/constant";

// utility
import { sendEmail } from "@/utility/email-utility";

export default Vue.extend({
  components: {
    ReservationForm
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
    ...mapGetters("businessDay", { getBusinessDayById: GET_BY_ID }),
    ...mapGetters("reservation", [HAS_SELECTED_SEATS]),
    ...mapGetters("timezone", { getTimezoneById: GET_BY_ID })
  },
  methods: {
    ...mapActions("reservation", [SAVE, FETCH_RESERVATION_SEATS]),
    ...mapMutations("reservation", [
      INITIALIZE,
      INITIALIZE_RESERVATION_SEATS,
      RESET_RESERVATION_SEATS,
      SET_RESERVATION_DATE,
      SET_RESERVATION_TIMEZONE
    ]),

    onClickSave(): void {
      const toastConfig: BNoticeConfig = {
        message: "",
        type: ""
      };

      this.isSaving = true;
      this.$v.$touch();

      if (!this.$v.$invalid && this.hasSelectedSeats) {
        this.save(this.reservation)
          .then((newId: string) => {
            toastConfig.message = "予約しました。";
            toastConfig.type = "is-success";

            this._sendEmail(newId);
            this.$buefy.toast.open(toastConfig);
            this.$router.push({ name: "reserved-message", params: { id: newId } });
          })
          .catch(error => {
            toastConfig.message = error.message ? error.message : "予約の登録に失敗しました。";
            toastConfig.type = "is-danger";

            this.$buefy.toast.open(toastConfig);

            if (error.refetch_seats) {
              this._fetchReservationSeats();
            }
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
     * 予約日更新callback
     * @param selectedId
     */
    onUpdateReservationDate(selectedId: string): void {
      const businessDay = this.getBusinessDayById(selectedId);
      this.setReservationDate(businessDay.business_date);
      this.seatSeachOption.reservation_date_id = selectedId;
      this.seatSeachOption.reservation_time_id = "";
      this._fetchReservationSeats();
    },

    /**
     * 予約時間帯更新callback
     * @param selectedId
     */
    onUpdateReservationTime(selectedId: string): void {
      const timezone = this.getTimezoneById(selectedId);
      this.setReservationTimezone(timezone);
      this.seatSeachOption.reservation_time_id = selectedId;
      this._fetchReservationSeats();
    },

    /**
     * データ読込完了通知イベント
     */
    onDataLoaded(): void {
      this.isLoading = false;
    },

    /**
     * 予約座席情報取得
     */
    _fetchReservationSeats(): void {
      const hasSearchOption =
        !_.isEmpty(this.seatSeachOption.reservation_date_id) && !_.isEmpty(this.seatSeachOption.reservation_time_id);
      this.isLoadingSeats = true;

      if (hasSearchOption) {
        this.initializeReservationSeats();
        this.fetchReservationSeats(this.seatSeachOption).finally(() => {
          this.isLoadingSeats = false;
        });
      } else {
        this.resetReservationSeats();
        this.isLoadingSeats = false;
      }
    },

    /**
     * 予約完了通知メール送信
     * @param id
     */
    _sendEmail(id: string): void {
      const href = this.$router.resolve({
        name: "reservation-detail",
        params: {
          id: id
        }
      }).href;
      const redirectUrl = `${location.origin}${href}`;
      sendEmail(this.reservation, id, redirectUrl, EMAIL_MESSAGE_TEMPLATES.CREATED);
    }
  },
  data() {
    const seatSeachOption: ReservationSeatSearchOption = {
      reservation_id: "",
      reservation_date_id: "",
      reservation_time_id: ""
    };
    return {
      isSaving: false,
      isLoading: true,
      isLoadingSeats: false,
      seatSeachOption: seatSeachOption
    };
  },
  mounted() {
    this.initialize();
  }
});
