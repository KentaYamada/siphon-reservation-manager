import Vue from "vue";
import _ from "lodash";
import moment from "moment";
import { mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import { forkJoin } from "rxjs";
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";
import { NewYearDishesSettingService } from "@/services/firestore/new-year-dishes-setting-service";

export default Vue.extend({
  components: {
    ReservationForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapState("reservation", ["reservation"]),

    isAccessible(): boolean {
      if (this.setting.is_pause) {
        return false;
      }

      if (moment(this.setting.end_datetime).diff(new Date()) <= 0) {
        return false;
      }

      if (this.setting.receptions <= this.receptions) {
        return false;
      }

      return true;
    }
  },
  methods: {
    handleInitializing(): void {
      this.isProgressing = true;
    },

    handleInitialized(): void {
      this.isProgressing = false;
    },

    handleInitializeFailure(): void {
      // todo: redirect 503 page
      const toastConfig: BNoticeConfig = {
        message: "データの初期化に失敗しました",
        type: "is-danger"
      };
      this.isProgressing = false;
      this.$buefy.toast.open(toastConfig);
    },

    handleLoadReservationSeatsFailure(): void {
      const toastConfig: BNoticeConfig = {
        message: "予約座席データの取得に失敗しました。時間をおいてアクセスしてください。",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleSaving(): void {
      this.isProgressing = true;
    },

    handleSaveSuceeded(reservationId: string): void {
      const toastConfig: BNoticeConfig = {
        message: "予約しました",
        type: "is-success"
      };

      this.isProgressing = false;
      this.$buefy.toast.open(toastConfig);
      this.$router.push({ name: "reserved-message", params: { id: reservationId } });
    },

    handleSaveFailure(error: any): void {
      let message = "予約することができませんでした";
      if (error.message) {
        message = error.message;
      }

      const toastConfig: BNoticeConfig = {
        message: message,
        type: "is-danger"
      };

      this.isProgressing = false;
      this.$buefy.toast.open(toastConfig);
    },

    handleValidationFailure(): void {
      const toastConfig: BNoticeConfig = {
        message: "入力内容に誤りがあります。エラーメッセージを確認してください。",
        type: "is-danger"
      };

      this.isProgressing = false;
      this.$buefy.toast.open(toastConfig);
    }
  },
  created() {
    forkJoin([NewYearDishesSettingService.fetch(), NewYearDishesReservationService.fetchReceptions()]).subscribe(
      value => {
        this.setting = value[0];
        this.receptions = value[1];
      },
      () => {
        this.$emit("initialize-failed");
      },
      () => {
        if (!this.isAccessible) {
          this.$emit("access-denied");
        }
      }
    );
  },
  data() {
    const setting = {} as NewYearDishesSetting;
    return {
      isProgressing: false,
      setting: setting,
      receptions: 0
    };
  }
});
