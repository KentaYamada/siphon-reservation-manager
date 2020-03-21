import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// component
import BusinessDayListItem from "@/components/business-day/list-item/BusinessDayListItem.vue";

// entity
import { BusinessDay } from "@/entity/business-day";

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
     */
    itemDeleteSucceeded(): void {
      const toastConfig: ToastConfig = {
        message: "削除しました。",
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
