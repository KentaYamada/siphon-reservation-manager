import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { BDialogConfig, BModalConfig, BNoticeConfig } from "buefy/types/components";
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";
import ReservationAddressDialog from "@/components/reservations/dialog/address/ReservationAddressDialog.vue";
import { ReservationList } from "@/entity/reservation-list";
import { ReservationListSeat } from "@/entity/reservation-list-seat";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import { formatReserver } from "@/filters/format-reserver";
import { CANCEL } from "@/store/constant";
import { sendEmail } from "@/utility/email-utility";

export default Vue.extend({
  template: "<reservation-list-item/>",
  components: {
    ReservationSeatList
  },
  props: {
    reservation: {
      required: true,
      type: Object as PropType<ReservationList>
    }
  },
  filters: {
    formatReservationDatetime,
    formatReserver
  },
  methods: {
    ...mapActions("reservation", [CANCEL]),

    handleShowAddressDialog(seat: ReservationListSeat): void {
      const config: BModalConfig = {
        parent: this,
        component: ReservationAddressDialog,
        hasModalCard: true,
        props: {
          seat: seat
        }
      };

      this.$buefy.modal.open(config);
    },

    handleCancel(): void {
      const message = `
            <p>予約を取消しますか？</p>
            <small>取消した予約は元に戻せません</small>
          `;
      const dialogConfig: BDialogConfig = {
        title: "予約取消",
        type: "is-danger",
        message: message,
        confirmText: "取消",
        cancelText: "キャンセル",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle",
        onConfirm: () => {
          this.cancel(this.reservation.id)
            .then(() => {
              this._sendEmail(this.reservation.id as string);

              const toastConfig: BNoticeConfig = {
                message: "予約取消しました",
                type: "is-danger"
              };

              this.$buefy.toast.open(toastConfig);
              this.$emit("delete-succeeded");
            })
            .catch(error => {
              const toastConfig: BNoticeConfig = {
                message: "予約の取消に失敗しました",
                type: "is-danger"
              };

              this.$buefy.toast.open(toastConfig);
              console.error(error);
            });
        }
      };

      this.$buefy.dialog.confirm(dialogConfig);
    },

    /**
     * 予約キャンセル完了通知メール送信
     * @param id
     */
    _sendEmail(id: string): void {
      const href = this.$router.resolve({
        path: "/"
      }).href;
      const redirectUrl = `${location.origin}${href}`;
      sendEmail(this.reservation, id, redirectUrl, EMAIL_MESSAGE_TEMPLATES.CANCELED);
    }
  }
});
