import Vue from "vue";
import { tap } from "rxjs/operators";
import { BDialogConfig, BNoticeConfig } from "buefy/types/components";
import ReservationDetailContent from "@/components/reservations/detail/ReservationDetailContent.vue";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";
import { sendEmail } from "@/utility/email-utility";
import { ReservationService } from "@/services/firestore/reservation-service";

export default Vue.extend({
  components: {
    ReservationDetailContent
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    handleConfirmCancel(): void {
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

          ReservationService.cancel(this.id)
            .pipe(tap(() => (this.isProgress = false)))
            .subscribe(
              () => {
                const config: BNoticeConfig = {
                  message: "予約を取り消しました",
                  type: "is-danger"
                };

                this.$buefy.toast.open(config);
                this.$router.push({ name: "reservation-canceled-message" });
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

                this.$buefy.toast.open(toastConfig);
              }
            );
        }
      };

      this.$buefy.dialog.confirm(config);
    },

    handleClickEdit() {
      this.$router.push({ name: "reservation-edit", params: { id: this.id } });
    },

    handleLoadFailed() {
      const toastConfig: BNoticeConfig = {
        message: "予約情報の取得に失敗しました。時間をおいてアクセスしてください。",
        type: "is-danger"
      };

      this.$buefy.toast.open(toastConfig);
      this.$router.push({ name: "notfound" });
    },

    handleUpdateIsAvailableActions(isAvailableActions: boolean) {
      this.isAvailableActions = isAvailableActions;
    },

    handleUpdateProgress(isProgress: boolean) {
      this.isProgress = isProgress;
    },

    _sendEmail(id: string): void {
      const href = this.$router.resolve({
        path: "/"
      }).href;
      const redirectUrl = `${location.origin}${href}`;
      // sendEmail(this.reservation, id, redirectUrl, EMAIL_MESSAGE_TEMPLATES.CANCELED);
    }
  },
  data() {
    return {
      isProgress: false,
      isAvailableActions: true
    };
  }
});
