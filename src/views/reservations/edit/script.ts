import Vue from "vue";
import _ from "lodash";
import moment from "moment";
import { BNoticeConfig } from "buefy/types/components";
import { forkJoin } from "rxjs";
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";
import { NewYearDishesSettingService } from "@/services/firestore/new-year-dishes-setting-service";
import { sendEmail } from "@/utility/email-utility";

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
    handleInitializeFailed(): void {
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

    handleSaveSuceeded(reservationId: string): void {
      const toastConfig: BNoticeConfig = {
        message: "予約しました",
        type: "is-success"
      };

      this.$buefy.toast.open(toastConfig);
      this._sendEmail(reservationId);
      this.$router.push({ name: "reserved-message", params: { id: reservationId } });
    },

    handleSaveFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "予約することができませんでした",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
    },

    handleUpdateProgress(isProgress: boolean) {
      this.isProgressing = isProgress;
    },

    handleValidationFailed(): void {
      const toastConfig: BNoticeConfig = {
        message: "入力内容に誤りがあります。エラーメッセージを確認してください。",
        type: "is-danger"
      };

      this.isProgressing = false;
      this.$buefy.toast.open(toastConfig);
    },

    _sendEmail(id: string): void {
      const href = this.$router.resolve({
        name: "reservation-detail",
        params: {
          id: id
        }
      }).href;
      const redirectUrl = `${location.origin}${href}`;
      // todo: cloud functions triggerを使ってメール配信する
      sendEmail(this.reservation, id, redirectUrl, EMAIL_MESSAGE_TEMPLATES.EDITED);
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
