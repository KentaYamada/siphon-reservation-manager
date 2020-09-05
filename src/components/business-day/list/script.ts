import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import BusinessDayListItem from "@/components/business-day/list-item/BusinessDayListItem.vue";
import { FETCH, HAS_ITEMS } from "@/store/constant";

export default Vue.extend({
  template: "<business-day-list/>",
  components: {
    BusinessDayListItem
  },
  props: {
    isCreatedNewData: {
      required: true,
      type: Boolean
    }
  },
  watch: {
    isCreatedNewData: function (newVal: boolean, oldVal: boolean) {
      if (newVal) {
        this._fetch();
      }
    }
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

    handleDeleteSucceeded(): void {
      this.$emit("delete-business-day-succeeded");
      this._fetch();
    },

    handleDeleteFailed(): void {
      this.$emit("delete-business-day-failed");
    },

    handleLoadFailed(): void {
      this.$emit("load-business-day-failed");
    },

    handleSaveSucceeded(): void {
      this.$emit("save-business-day-succeeded");
      this._fetch();
    },

    handleSaveFailed(): void {
      this.$emit("save-business-day-failed");
    },

    handleSyncSelectableTimezonesFailed(): void {
      this.$emit("sync-selectable-timezones-failed");
    },

    handleValidationFailed(): void {
      this.$emit("validation-failed");
    },

    _fetch(): void {
      this.isLoading = true;
      this.fetch()
        .catch(() => {
          this.$emit("load-business-days-failed");
        })
        .finally(() => {
          this.isLoading = false;
          this.$emit("business-days-loaded");
        });
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  mounted() {
    this._fetch();
  }
});
