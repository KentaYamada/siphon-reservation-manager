import Vue from "vue";
import { mapActions, mapState } from "vuex";

// entity
import { ReservationSearchOption } from "@/entity/reservation-search-option";

// store
import { FETCH } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-search-form/>",
  computed: {
    ...mapState("timezone", ["timezones"])
  },
  methods: {
    ...mapActions("timezone", [FETCH]),

    handleSearch(): void {
      this.$emit("update-search-options", this.options);
    }
  },
  data() {
    const options: ReservationSearchOption = {
      reservation_date: new Date(),
      timezone_id: null
    };

    return {
      options
    };
  },
  mounted() {
    // 予約時間帯データ取得
    this.fetch();
  }
});
