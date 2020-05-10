import Vue from "vue";
import { mapGetters } from "vuex";

// components
import ReservationResendMailForm from "@/components/reservations/form/resend-mail/ReservationResendMailForm.vue";

// store
import { CAN_SEND_MAIL } from "@/store/constant";

export default Vue.extend({
  components: {
    ReservationResendMailForm
  },
  computed: {
    ...mapGetters("reservationResendMail", [CAN_SEND_MAIL])
  },
  methods: {
    handleSendMail(): void {
      console.log("run");
    }
  }
});
