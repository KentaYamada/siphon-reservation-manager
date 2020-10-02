import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { BDialogConfig, BModalConfig, BNoticeConfig } from "buefy/types/components";
import ReservationAddressDialog from "@/components/reservations/dialog/address/ReservationAddressDialog.vue";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";
import { Reservation } from "@/entity/reservation";
import { ReservationListSeat } from "@/entity/reservation-list-seat";
import { formatReserver } from "@/filters/format-reserver";
import { CANCEL } from "@/store/constant";
import { sendEmail } from "@/utility/email-utility";

export default Vue.extend({
  template: "<reserver-card/>",
  props: {
    reserver: {
      required: true,
      type: Object as PropType<ReservationListSeat>
    }
  },
  methods: {
    ...mapActions("reservation", [CANCEL]),

    handleShowAddressDialog() {
      const config: BModalConfig = {
        parent: this,
        component: ReservationAddressDialog,
        hasModalCard: true,
        props: {
          reserver: this.reserver
        }
      };

      this.$buefy.modal.open(config);
    },

    handleCancel() {
      const message = `
            <p>予約を取消しますか？</p>
            <small>取消した予約は元に戻せません</small>
          `;
      const dialogConfig: BDialogConfig = {
        type: "is-danger",
        message: message,
        confirmText: "はい",
        cancelText: "いいえ",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle",
        onConfirm: () => {
          this.cancel(this.reserver.reservation_id)
            .then(() => {
              // const href = this.$router.resolve({ path: "/" }).href;
              // const redirectUrl = `${location.origin}${href}`;
              // const reservation: Reservation = {
              //   id: this.reserver.id,
              //   reserver_name: this.reserver.reserver_name
              //
              // };
              // sendEmail(reservation, reservation.id, redirectUrl, EMAIL_MESSAGE_TEMPLATES.CANCELED);

              this.$emit("cancel-succeeded");
            })
            .catch(() => {
              this.$emit("cancel-failed");
            });
        }
      };

      this.$buefy.dialog.confirm(dialogConfig);
    }
  },
  filters: {
    formatReserver
  }
});
