import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// component
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

// entity
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";

// plugin
import _ from "lodash";
import firebase from "@/plugins/firebase";
import { required, email } from "vuelidate/lib/validators";
import { tel } from "@/plugins/validate";

// store
import {
  FETCH_RESERVATION_SEATS,
  INITIALIZE,
  INITIALIZE_RESERVATION_SEATS,
  RESET_RESERVATION_SEATS,
  SAVE
} from "@/store/constant";

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
    ...mapState("reservation", ["reservation"])
  },
  methods: {
    ...mapActions("reservation", [SAVE, FETCH_RESERVATION_SEATS]),
    ...mapMutations("reservation", [
      INITIALIZE,
      INITIALIZE_RESERVATION_SEATS,
      RESET_RESERVATION_SEATS
    ]),

    onClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isSaving = true;
        this.save(this.reservation)
          .then(newId => {
            const sendMail = firebase.functions().httpsCallable("sendMail");
            sendMail().then(res => console.log(res)).catch(error => console.error(error));

            const toastConfig: ToastConfig = {
              message: "予約しました。",
              type: "is-success"
            };
            this.$buefy.toast.open(toastConfig);
            this.$router.push({
              name: "reserved-message",
              params: { id: newId }
            });
          })
          .catch(error => {
            // todo: error handling
            console.error(error);
          })
          .finally(() => {
            this.isSaving = false;
          });
      }
    },

    /**
     * 予約日更新callback
     * @param selectedId
     */
    onUpdateReservationDate(selectedId: string): void {
      this.seatSeachOption.reservation_date_id = selectedId;
      this.__fetchReservationSeats();
    },

    /**
     * 予約時間帯更新callback
     * @param selectedId
     */
    onUpdateReservationTime(selectedId: string): void {
      this.seatSeachOption.reservation_time_id = selectedId;
      this.__fetchReservationSeats();
    },

    /**
     * 予約座席情報取得
     */
    __fetchReservationSeats(): void {
      const hasSearchOption =
        !_.isEmpty(this.seatSeachOption.reservation_date_id) &&
        !_.isEmpty(this.seatSeachOption.reservation_time_id);

      if (hasSearchOption) {
        this.initializeReservationSeats();
        this.fetchReservationSeats(this.seatSeachOption);
      } else {
        this.resetReservationSeats();
      }
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
      seatSeachOption: seatSeachOption
    };
  },
  mounted() {
    this.initialize();
  }
});
