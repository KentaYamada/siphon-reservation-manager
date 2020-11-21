import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import NewYearDishesReservationList from "@/components/new-year-dishes-reservations/list/NewYearDishesReservationList.vue";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { NewYearDishesSettingService } from "@/services/firestore/new-year-dishes-setting-service";

export default Vue.extend({
  components: {
    NewYearDishesReservationList
  },
  computed: {
    currentReceptions(): string {
      return `現在の予約数: ${this.receptions} / ${this.reception_limit}`;
    },

    visibleCurrentReceptions(): boolean {
      return this.reception_limit > 0;
    }
  },
  methods: {
    handleLoadFailed() {
      const toastConfig: BNoticeConfig = {
        message: "データの読み込みに失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleCancelSucceeded() {
      const toastConfig: BNoticeConfig = {
        message: "予約取り消しました",
        type: "is-success"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleCancelFailed() {
      const toastConfig: BNoticeConfig = {
        message: "予約の取り消しに失敗しました",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleUpdateProgress(isProgress: boolean) {
      this.isProgress = isProgress;
    },

    handleUpdateCurrentReceptions(receptions: number) {
      this.receptions = receptions;
    }
  },
  data() {
    return {
      isProgress: false,
      receptions: 0,
      reception_limit: 0
    };
  },
  created() {
    NewYearDishesSettingService.fetch().subscribe(
      (setting: NewYearDishesSetting) => (this.reception_limit = setting.receptions),
      () => {
        const config: BNoticeConfig = {
          message: "データの読み込みに失敗しました",
          type: "is-danger"
        };
        this.$buefy.toast.open(toastConfig);
      }
    );
  }
});
