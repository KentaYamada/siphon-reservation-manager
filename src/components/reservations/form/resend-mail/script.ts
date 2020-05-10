import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// store
import { INITIALIZE, FETCH } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-resend-mail-form/>",
  props: {
    validations: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapState("businessDay", ["businessDays"]),
    ...mapState("timezone", ["timezones"]),
    ...mapState("reservationResendMail", ["reservationResendMail"])
  },
  methods: {
    ...mapActions("businessDay", {
      fetchBusinessDays: FETCH
    }),
    ...mapActions("timezone", {
      fetchTimezones: FETCH
    }),
    ...mapMutations("reservationResendMail", [INITIALIZE])
  },
  mounted() {
    this.initialize();

    Promise.all([this.fetchBusinessDays, this.fetchBusinessDays]).catch(() => {
      const toastConfig: ToastConfig = {
        message: "データの取得に失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    });
  }
});
