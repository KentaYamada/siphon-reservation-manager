import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";
import { required, email } from "vuelidate/lib/validators";

// store
import { INITIALIZE, SAVE } from "@/store/constant";

// component
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

export default Vue.extend({
  components: {
    ReservationForm
  },
  validations: {
    reservation: {
      reservation_date: {
        required
      },
      reservation_time: {
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
