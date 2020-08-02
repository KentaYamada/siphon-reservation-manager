import Vue from "vue";
import { mapActions, mapState } from "vuex";
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

    handleChangeReservationDate(selectedId: string) {
      this.$emit("update-reservation-date-id", selectedId);
    },

    handleChangeReservationTime(selectedId: string) {
      this.$emit("update-reservation-time-id", selectedId);
    },

    handleSearch(): void {
      this.$emit("search");
    }
  },
  data() {
    return {
      reservationDateId: "",
      reservationTimeId: ""
    };
  },
  mounted() {
    Promise.all([this.fetchTimezones(), this.fetchBusinessDays()]).catch(() => {
      this.$emit("load-search-data-failure");
    });
  }
});
