import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { FETCH } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-search-form/>",
  computed: {
    ...mapState("timezone", ["timezones"])
  },
  methods: {
    ...mapActions("timezone", [FETCH]),

    handleSearch(): void {
      this.$emit("update-search-options");
    }
  },
  mounted() {
    // 予約時間帯データ取得
    this.fetch();
  }
});
