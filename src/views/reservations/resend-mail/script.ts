import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

// components
import ReservationResendMailForm from "@/components/reservations/form/resend-mail/ReservationResendMailForm.vue";

// store
import { CAN_SEND_MAIL, SEND_MAIL } from "@/store/constant";

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
    ...mapActions("reservationResendMail", [SEND_MAIL]),

    /**
     * メール送信
     */
    handleSendMail(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sendMail(this.reservationResendMail);
      }
    }
  }
});
