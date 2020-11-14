import Vue from "vue";
import moment from "moment";
import { BDialogConfig, BNoticeConfig } from "buefy/types/components";
import { tap } from "rxjs/operators";
import NewYearDishesReservationDetail from "@/components/new-year-dishes-reservations/detail/NewYearDishesReservationDetail.vue";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";
import { NewYearDishesSettingService } from "@/services/firestore/new-year-dishes-setting-service";

export default Vue.extend({
  components: {
    NewYearDishesReservationDetail
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    visibleActions(): boolean {
      if (this.setting.is_pause) {
        return false;
      }

      if (moment(this.setting.end_datetime).diff(new Date()) <= 0) {
        return false;
      }

      return true;
    }
  },
  methods: {
    handleCancel() {
      const message = `
        <p>予約を取り消しますか？</p>
        <small>※取り消した後の予約はもとに戻せません。</small>
      `;
      const config: BDialogConfig = {
        type: "is-danger",
        message: message,
        confirmText: "取り消し",
        cancelText: "閉じる",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle",
        onConfirm: () => {
          this.isProgress = true;

          NewYearDishesReservationService.cancel(this.id)
            .pipe(tap(() => (this.isProgress = false)))
            .subscribe(
              () => {
                const config: BNoticeConfig = {
                  message: "予約を取り消しました",
                  type: "is-danger"
                };

                this.$buefy.toast.open(config);
                this.$router.push({ name: "new-year-dishes-reservation-canceled-message" });
              },
              () => {
                const message = `
                    <p>予約の取り消しに失敗しました</p>
                    <p>お手数ですが、時間をおいて再度実行してください</p>
                  `;
                const toastConfig: BNoticeConfig = {
                  message: message,
                  type: "is-danger"
                };

                this.$buefy.toast.open(config);
              }
            );
        }
      };

      this.$buefy.dialog.confirm(config);
    },

    handleLoadFailed() {
      const config: BNoticeConfig = {
        message: "予約情報の取得に失敗しました。時間をおいてアクセスしてください。",
        type: "is-danger"
      };
      this.$buefy.toast.open(config);
      this.$router.push({ name: "notfound" });
    },

    handleRedirectEditPage() {
      this.$router.push({
        name: "new-year-dishes-reservation-edit",
        params: {
          id: this.id
        }
      });
    },

    handleNotfound() {
      this.$router.push({ name: "notfound" });
    },

    handleUpdateProgress(isProgress: boolean) {
      this.isProgress = isProgress;
    }
  },
  data() {
    return {
      isProgress: false,
      setting: {} as NewYearDishesSetting
    };
  },
  mounted() {
    NewYearDishesSettingService.fetch().subscribe((setting: NewYearDishesSetting) => (this.setting = setting));
  }
});
