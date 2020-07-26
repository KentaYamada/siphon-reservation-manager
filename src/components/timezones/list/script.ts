import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import TimezoneListItem from "@/components/timezones/list-item/TimezoneListItem.vue";
import { FETCH, HAS_ITEMS } from "@/store/constant";

export default Vue.extend({
  template: "<timezone-list/>",
  components: {
    TimezoneListItem
  },
  props: {
    isRefetchList: {
      required: true,
      type: Boolean
    }
  },
  watch: {
    isRefetchList: function (newVal: boolean, oldVal: boolean) {
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

    itemDeleteSucceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "削除しました。",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
      this._fetch();
    },

    itemEditSucceeded(): void {
      const toastConfig: BNoticeConfig = {
        message: "保存しました。",
        type: "is-success"
      };
      this.$buefy.toast.open(toastConfig);
      this._fetch();
    },

    _fetch(): void {
      this.isLoading = true;
      this.fetch()
        .catch(() => {
          const toastConfig: BNoticeConfig = {
            message: "予約時間帯の取得に失敗しました",
            type: "is-danger"
          };
          this.$buefy.toast.open(toastConfig);
        })
        .finally(() => {
          this.isLoading = false;
          this.$emit("fetched-timezones");
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
