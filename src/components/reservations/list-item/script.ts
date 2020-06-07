import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { DialogConfig, ToastConfig } from "buefy/types/components";

// component
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";

// entity
import { Reservation } from "@/entity/reservation";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";

// filter
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import { formatReserver } from "@/filters/format-reserver";

// store
import { CANCEL } from "@/store/constant";

// utility
import { sendEmail } from "@/utility/email-utility";

export default Vue.extend({
  template: "<reservation-list-item/>",
  components: {
    ReservationSeatList
  },
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    }
  },
  filters: {
    formatReservationDatetime,
    formatReserver
  },
  methods: {
    ...mapActions("reservation", [CANCEL]),

    onClickCancel(): void {
      const message = `
            <p>予約を取消しますか？</p>
            <small>取消した予約は元に戻せません</small>
          `;
      const dialogConfig: DialogConfig = {
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
              this.__sendEmail(this.reservation.id as string);

              const toastConfig: ToastConfig = {
                message: "予約取消しました",
                type: "is-danger"
              };

              this.$buefy.toast.open(toastConfig);
              this.$emit("delete-succeeded");
            })
            .catch(error => {
              const toastConfig: ToastConfig = {
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
    __sendEmail(id: string): void {
      const href = this.$router.resolve({
        path: "/"
      }).href;
      const redirectUrl = `${location.origin}${href}`;
      sendEmail(this.reservation, id, redirectUrl, EMAIL_MESSAGE_TEMPLATES.CANCELED);
    }
  }
});
