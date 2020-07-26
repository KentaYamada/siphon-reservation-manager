import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import BusinessDayListItem from "@/components/business-day/list-item/BusinessDayListItem.vue";
import { FETCH, HAS_ITEMS } from "@/store/constant";

export default Vue.extend({
  template: "<business-day-list/>",
  props: {
    refetchList: {
      required: true,
      type: Boolean
    }
  },
  watch: {
    refetchList: function (newVal: boolean, oldVal: boolean) {
      if (newVal) {
        this.fetchBusinessDays();
      }
    }
  },
  components: {
    BusinessDayListItem
  },
  computed: {
    ...mapGetters("businessDay", [HAS_ITEMS]),
    ...mapState("businessDay", ["businessDays"]),

    visibleEmptyItem(): boolean {
      return !this.isLoading && !this.hasItems;
    }
  },
  methods: {
    ...mapActions("businessDay", [FETCH]),

    itemDeleteSucceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "削除しました。",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
      this.fetchBusinessDays();
    },

    itemEditSucceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "保存しました。",
        type: "is-success"
      };
      this.$buefy.toast.open(toastConfig);
      this.fetchBusinessDays();
    },

    fetchBusinessDays(): void {
      this.isLoading = true;
      this.fetch()
        .catch(() => {
          const toastConfig: BNoticeConfig = {
            message: "営業日の取得に失敗しました。",
            type: "is-danger"
          };
          this.$buefy.toast.open(toastConfig);
        })
        .finally(() => {
          this.isLoading = false;
          this.$emit("fetched-business-days");
        });
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  mounted() {
    this.fetchBusinessDays();
  }
});
