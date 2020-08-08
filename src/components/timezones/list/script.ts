import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import TimezoneListItem from "@/components/timezones/list-item/TimezoneListItem.vue";
import { FETCH, HAS_ITEMS } from "@/store/constant";

export default Vue.extend({
  template: "<timezone-list/>",
  components: {
    TimezoneListItem
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
    ...mapGetters("timezone", [HAS_ITEMS]),
    ...mapState("timezone", ["timezones"]),

    visibleEmptyItem(): boolean {
      return !this.isLoading && !this.hasItems;
    }
  },
  methods: {
    ...mapActions("timezone", [FETCH]),

    handleDeleteSucceeded(): void {
      this.$emit("delete-timezone-succeeded");
      this._fetch();
    },

    handleDeleteFailed(): void {
      this.$emit("delete-timezone-failed");
    },

    handleLoadDataFailed(): void {
      this.$emit("load-timezone-failed");
    },

    handleSaveSucceeded(): void {
      this.$emit("save-timezone-succeeded");
      this._fetch();
    },

    handleSaveFailed(): void {
      this.$emit("save-timezone-failed");
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
          this.$emit("load-timezones-failed");
        })
        .finally(() => {
          this.isLoading = false;
          this.$emit("timezones-loaded");
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
