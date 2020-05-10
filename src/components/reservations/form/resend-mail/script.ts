import Vue from "vue";
import { mapMutations, mapState } from "vuex";

// store
import { INITIALIZE } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-resend-mail-form/>",
  computed: {
    ...mapState("reservationResendMail", ["reservationResendMail"])
  },
  methods: {
    ...mapMutations("reservationResendMail", [INITIALIZE])
  },
  created() {
    this.initialize();
  }
});
