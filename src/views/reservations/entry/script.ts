import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// component
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

// entity
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";

// plugin
import { required, email } from "vuelidate/lib/validators";

// store
import { FETCH, INITIALIZE, SAVE } from "@/store/constant";

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
        required
      },
      mail: {
        required,
        email
      }
    }
  },
  computed: {
    ...mapState("reservation", ["reservation"]),
    ...mapState("reservationSeat", ["reservationSeats"])
  },
  methods: {
    ...mapActions("reservation", [SAVE]),
    ...mapActions("reservationSeat", [FETCH]),
    ...mapMutations("reservation", {
      initReservation: INITIALIZE
    }),
    ...mapMutations("reservationSeat", {
      initReservationSeats: INITIALIZE
    }),

    onClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isSaving = true;
        this.save(this.reservation)
          .then(doc => {
            const toastConfig: ToastConfig = {
              message: "予約しました。",
              type: "is-success"
            };
            this.$buefy.toast.open(toastConfig);
            this.$router.push({
              name: "reserved-message",
              params: { id: doc.id }
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
      const hasSearchOption =
        this.seatSeachOption.reservation_date_id &&
        this.seatSeachOption.reservation_time_id;

      if (hasSearchOption) {
        this.initReservationSeats();
        this.fetch(this.seatSeachOption);
      }
    },

    /**
     * 予約時間帯更新callback
     * @param selectedId
     */
    onUpdateReservationTime(selectedId: string): void {
      this.seatSeachOption.reservation_time_id = selectedId;
      const hasSearchOption =
        this.seatSeachOption.reservation_date_id &&
        this.seatSeachOption.reservation_time_id;

      if (hasSearchOption) {
        this.initReservationSeats();
        this.fetch(this.seatSeachOption);
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
    this.initReservation();
    this.initReservationSeats();
  }
});
