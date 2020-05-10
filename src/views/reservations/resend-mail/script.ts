import Vue from "vue";

// components
import ReservationResendMailForm from "@/components/reservations/form/resend-mail/ReservationResendMailForm.vue";

export default Vue.extend({
  components: {
    ReservationResendMailForm
  },
  methods: {
    handleSendMail(): void {
      console.log("run");
    }
  },
  data() {
    return {
      disableSendMail: true
    };
  }
});
