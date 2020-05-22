import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// components
import ReservationResendMailForm from "@/components/reservations/form/resend-mail/ReservationResendMailForm.vue";

// store
import { CAN_SEND_MAIL, SAVE } from "@/store/constant";

// plugin
import { required, email } from "vuelidate/lib/validators";

export default Vue.extend({
  components: {
    ReservationResendMailForm
  },
  validations: {
    reservationResendMail: {
      mail: {
        required,
        email
      }
    }
  },
  computed: {
    ...mapState("reservationResendMail", ["reservationResendMail"]),
    ...mapGetters("reservationResendMail", [CAN_SEND_MAIL])
  },

  methods: {
    ...mapActions("reservationResendMail", [SAVE]),

    /**
     * メール送信
     */
    handleSendMail(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.save(this.reservationResendMail).then(() => {
          const toastConfig: ToastConfig = {
            message: "メールの再送受け付けました。",
            type: "is-success"
          };

          this.$buefy.toast.open(toastConfig);
          this.$router.push({ name: "reservation-resend-mail-accepted" });
        });
      }
    }
  }
});
