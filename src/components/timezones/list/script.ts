import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";

// component
import TimezoneListItem from "@/components/timezones/list-item/TimezoneListItem.vue";

// store
import { FETCH, HAS_ITEMS } from "@/store/constant";

export default Vue.extend({
  template: "<timezone-list/>",
  components: {
    TimezoneListItem
  },
  computed: {
    ...mapGetters("timezone", [HAS_ITEMS]),
    ...mapState("timezone", ["timezones"])
  },
  methods: {
    ...mapActions("timezone", [FETCH]),

    /**
     * 予約時間帯削除後イベント
     * list-item component callback function
     */
    itemDeleteSucceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "削除しました。",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
      this.fetch();
    },

    /**
     * 予約時間帯編集後イベント
     * list-item component callback function
     */
    itemEditSucceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "保存しました。",
        type: "is-success"
      };
      this.$buefy.toast.open(toastConfig);
      this.fetch();
    }
  },
  mounted() {
    this.fetch();
  }
});
