import Vue from "vue";
import { BDialogConfig, BNoticeConfig } from "buefy/types/components";
import NewYearDishesReservationDetail from "@/components/new-year-dishes-reservations/detail/NewYearDishesReservationDetail.vue";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";

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

          NewYearDishesReservationService.cancel(this.id).subscribe(
            () => {
              const config: BNoticeConfig = {
                message: "予約を取り消しました",
                type: "is-danger"
              };

              this.$buefy.toast.open(config);
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
            },
            () => {
              this.isProgress = false;
            }
          );
        }
      };

      this.$buefy.toast.open(config);
    },

    handleLoadFailed() {
      const toastConfig: BNoticeConfig = {
        message: "予約情報の取得に失敗しました。時間をおいてアクセスしてください。",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
      this.$router.push({ name: "notfound" });
    },

    handleRedirectEditPage() {
      console.log("run");
    },

    handleUpdateProgress(isProgress: boolean) {
      this.isProgress = isProgress;
    }
  },
  data() {
    return {
      isProgress: false
    };
  }
});
