import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";
import { required, email } from "vuelidate/lib/validators";

// component
import ReservationAllReservedForm from "@/components/reservations/form/all-reserved/ReservationAllReservedForm.vue";

// store
import { INITIALIZE, SAVE } from "@/store/constant";

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
    ...mapActions("reservation", [SAVE]),
    ...mapMutations("reservation", [INITIALIZE]),

    onClickSave(): void {
      console.log(this.reservation);
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isSaving = true;
        this.save(this.reservation)
          .then(() => {
            const toastConfig: ToastConfig = {
              message: "設定しました。",
              type: "is-success"
            };

            this.$buefy.toast.open(toastConfig);
            this.$router.push({ name: "reservation-list" });
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
    this.initialize();
  }
});
