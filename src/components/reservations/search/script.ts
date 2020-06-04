import Vue, { PropType } from "vue";
import { mapActions, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// entity
import { ReservationSearchOption } from "@/entity/reservation-search-option";

// store
import { FETCH } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-search-form/>",
  props: {
    searchOptions: {
      required: true,
      type: Object as PropType<ReservationSearchOption>
    }
  },
  computed: {
    ...mapState("businessDay", ["businessDays"]),
    ...mapState("timezone", ["timezones"])
  },
  methods: {
    ...mapActions("businessDay", {
      fetchBusinessDays: FETCH
    }),
    ...mapActions("timezone", {
      fetchTimezones: FETCH
    }),

    handleSearch(): void {
      this.$emit("update-search-options", this.searchOptions);
    }
  },
  mounted() {
    const promises = [this.fetchTimezones(), this.fetchBusinessDays()];

    Promise.all(promises).catch(() => {
      const toastConfig: ToastConfig = {
        message: "データの読み込みに失敗しました。",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
    });
  }
});
