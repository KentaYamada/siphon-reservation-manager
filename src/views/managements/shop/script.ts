import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { BModalConfig, BNoticeConfig } from "buefy/types/components";
import _ from "lodash";
import BusinessDayDialog from "@/components/business-day/dialog/BusinessDayDialog.vue";
import BusinessDayList from "@/components/business-day/list/BusinessDayList.vue";
import TimezoneDialog from "@/components/timezones/dialog/TimezoneDialog.vue";
import TimezoneList from "@/components/timezones/list/TimezoneList.vue";
import { Timezone } from "@/entity/timezone";
import { FETCH, FETCH_SELECTABLE_TIMEZONES, INITIALIZE } from "@/store/constant";

export default Vue.extend({
  components: {
    BusinessDayList,
    TimezoneList
  },
  methods: {
    ...mapMutations("businessDay", [INITIALIZE]),
    ...mapActions("businessDay", {
      fetchSelectableTimezones: FETCH_SELECTABLE_TIMEZONES
    }),
    ...mapActions("timezone", {
      fetchTimezones: FETCH
    }),

    handleShowTimezoneDialog(): void {
      const timezone: Timezone = {
        start_time: new Date(),
        end_time: new Date(),
        is_default_select: false
      };
      const config: BModalConfig = {
        parent: this,
        component: TimezoneDialog,
        hasModalCard: true,
        scroll: "keep",
        props: {
          timezone: timezone
        },
        events: {
          "save-success": () => {
            const toastConfig: BNoticeConfig = {
              message: "保存しました。",
              type: "is-success"
            };

            this.$buefy.toast.open(toastConfig);
            this.showMenuButton = false;
            this.isRefetchTimezones = true;
          }
        }
      };

      this.$buefy.modal.open(config);
    },

    handleShowBusinessDayDialog(): void {
      const config: BModalConfig = {
        parent: this,
        component: BusinessDayDialog,
        hasModalCard: true,
        scroll: "keep",
        events: {
          "save-success": () => {
            const toastConfig: BNoticeConfig = {
              message: "保存しました。",
              type: "is-success"
            };

            this.$buefy.toast.open(toastConfig);
            this.showMenuButton = false;
            this.isRefetchBusinessDays = true;
          }
        }
      };

      this.$buefy.modal.open(config);
    },

    toggleAddMenuButtons(): void {
      this.showMenuButton = !this.showMenuButton;
    },

    updateIsRefetchBusinessDays() {
      this.isRefetchBusinessDays = false;
    },

    fetchedTimezones() {
      this.isRefetchTimezones = false;
    }
  },
  data() {
    return {
      showMenuButton: false,
      isRefetchBusinessDays: false,
      isRefetchTimezones: false
    };
  }
});
