import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";
import { required, email } from "vuelidate/lib/validators";

// store
import { FETCH_BY_ID, SAVE } from "@/store/constant";

// component
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

export default Vue.extend({
  components: {
    ReservationForm
  },
  props: {
    id: {
      required: true,
      type: String
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
    ...mapState("reservation", ["reservation"])
  },
  methods: {
    ...mapActions("reservation", [FETCH_BY_ID, SAVE]),

    /**
     *  予約変更イベント
     */
    onClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isSaving = true;
        this.save(this.reservation)
          .then(() => {
            const toastConfig: ToastConfig = {
              message: "予約変更しました。",
              type: "is-success"
            };

            this.$buefy.toast.open(toastConfig);
            this.$router.push({
              name: "reservation-edited-message",
              params: { id: this.id }
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
    }
  },
  data() {
    return {
      isSaving: false
    };
  },
  mounted() {
    this.fetchById(this.id);
  }
});
