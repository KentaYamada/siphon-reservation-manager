import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";

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

    const promises = [this.fetchBusinessDays(), this.fetchTimezones()];
    Promise.all(promises).catch(() => {
      const toastConfig: BNoticeConfig = {
        message: "データの取得に失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    });
  }
});
