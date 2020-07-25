import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { BModalConfig, BNoticeConfig } from "buefy/types/components";

// component
import BusinessDayDialog from "@/components/business-day/dialog/BusinessDayDialog.vue";
import BusinessDayList from "@/components/business-day/list/BusinessDayList.vue";
import TimezoneDialog from "@/components/timezones/dialog/TimezoneDialog.vue";
import TimezoneList from "@/components/timezones/list/TimezoneList.vue";

// entity
import { BusinessDay } from "@/entity/business-day";
import { Timezone } from "@/entity/timezone";

// plugin
import _ from "lodash";

// store
import { FETCH, FETCH_SELECTABLE_TIMEZONES, INITIALIZE } from "@/store/constant";

export default Vue.extend({
  components: {
    BusinessDayList,
    TimezoneList
  },
  computed: {
    ...mapState("businessDay", ["businessDay"])
  },
  methods: {
    ...mapMutations("businessDay", [INITIALIZE]),
    ...mapActions("businessDay", {
      fetchBusinessDays: FETCH,
      fetchSelectableTimezones: FETCH_SELECTABLE_TIMEZONES
    }),
    ...mapActions("timezone", {
      fetchTimezones: FETCH
    }),

    /**
     * 予約時間帯設定ダイアログ表示
     */
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
            this.fetchTimezones();
          }
        }
      };

      this.$buefy.modal.open(config);
    },

    /**
     * 営業日設定フォーム表示
     */
    handleShowBusinessDayDialog(): void {
      this.initialize();
      this.fetchSelectableTimezones().then(() => {
        const businessDay: BusinessDay = _.clone(this.businessDay);
        const config: BModalConfig = {
          parent: this,
          component: BusinessDayDialog,
          hasModalCard: true,
          scroll: "keep",
          props: {
            businessDay: businessDay
          },
          events: {
            "save-success": () => {
              const toastConfig: BNoticeConfig = {
                message: "保存しました。",
                type: "is-success"
              };

              this.$buefy.toast.open(toastConfig);
              this.showMenuButton = false;
              this.fetchBusinessDays();
            }
          }
        };

        this.$buefy.modal.open(config);
      });
    },

    /**
     * 追加メニューボタンのトグル
     */
    toggleAddMenuButtons(): void {
      this.showMenuButton = !this.showMenuButton;
    }
  },
  data() {
    return {
      showMenuButton: false
    };
  }
});
