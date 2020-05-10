import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

// components
import ReservationResendMailForm from "@/components/reservations/form/resend-mail/ReservationResendMailForm.vue";

// store
import { CAN_SEND_MAIL, SEND_MAIL } from "@/store/constant";

export default Vue.extend({
  components: {
    ReservationResendMailForm
  },
  computed: {
    ...mapState("reservationResendMail", ["reservationResendMail"]),
    ...mapGetters("reservationResendMail", [CAN_SEND_MAIL])
  },

  methods: {
    ...mapActions("reservationResendMail", [SEND_MAIL]),

    handleSendMail(): void {
      this.sendMail(this.reservationResendMail);
    }
  }
});
