import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// entity
import { Reservation } from "@/entity/reservation";

// store
import {
  FETCH,
  FETCH_BUSINESS_DATE_AFTER_TODAY,
  GET_BY_ID,
  SET_RESERVATION_DATE,
  SET_RESERVATION_TIMEZONE
} from "@/store/constant";

export default Vue.extend({
  template: "<reservation-all-reserved-form/>",
  computed: {
    ...mapState("businessDay", ["businessDays"]),
    ...mapState("timezone", ["timezones"])
  },
  methods: {
    ...mapActions("businessDay", [FETCH_BUSINESS_DATE_AFTER_TODAY]),
    ...mapActions("timezone", [FETCH])
  },
  mounted() {
    const promises = [this.fetchBusinessDateAfterToday(), this.fetch()];

    Promise.all(promises)
      .then(() => {
        this.$emit("data-loaded");
      })
      .catch(() => {
        const toastConfig: ToastConfig = {
          message: "データの初期化に失敗しました。",
          type: "is-danger"
        };
        this.$buefy.toast.open(toastConfig);
      });
  }
});
