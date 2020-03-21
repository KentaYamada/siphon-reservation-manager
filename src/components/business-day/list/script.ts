import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// component
import BusinessDayListItem from "@/components/business-day/list-item/BusinessDayListItem.vue";

// store
import { FETCH, HAS_ITEMS } from "@/store/constant";

export default Vue.extend({
  template: "<business-day-list/>",
  components: {
    BusinessDayListItem
  },
  computed: {
    ...mapGetters("businessDay", [HAS_ITEMS]),
    ...mapState("businessDay", ["businessDays"])
  },
  methods: {
    ...mapActions("businessDay", [FETCH]),

    /**
     * 営業日削除後イベント
     * list-item component callback function
     */
    itemDeleteSucceeded(): void {
      const toastConfig: ToastConfig = {
        message: "削除しました。",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
      this.fetch();
    },

    /**
     * 営業日編集後イベント
     * list-item component callback function
     */
    itemEditSucceeded(): void {
      const toastConfig: ToastConfig = {
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
