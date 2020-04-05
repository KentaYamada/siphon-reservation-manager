import Vue from "vue";
import { mapActions, mapState } from "vuex";

// entity
import { ReservationSearchOption } from "@/entity/reservation-search-option";

// store
import { FETCH } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-search-form/>",
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
      this.$emit("update-search-options", this.options);
    }
  },
  data() {
    const options: ReservationSearchOption = {
      reservation_date_id: "",
      reservation_timezone_id: ""
    };

    return {
      options: options
    };
  },
  mounted() {
    this.fetchTimezones();
    this.fetchBusinessDays();
  }
});
