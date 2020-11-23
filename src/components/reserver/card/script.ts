import Vue, { PropType } from "vue";
import { BDialogConfig, BModalConfig } from "buefy/types/components";
import ReservationAddressDialog from "@/components/reservations/dialog/address/ReservationAddressDialog.vue";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";
import { Reservation } from "@/entity/reservation";
import { formatReserver } from "@/filters/format-reserver";
import { nl2br } from "@/filters/nl2br";
import { sendEmail } from "@/utility/email-utility";

export default Vue.extend({
  template: "<reserver-card/>",
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    }
  },
  computed: {
    comment(): string {
      return nl2br(this.reservation.comment);
    },
    seatNo(): string {
      return this.reservation.seats.join(", ");
    }
  },
  methods: {
    handleShowAddressDialog() {
      const config: BModalConfig = {
        parent: this,
        component: ReservationAddressDialog,
        hasModalCard: true,
        props: {
          reservation: this.reservation
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
          // todo: cancel
        }
      };

      this.$buefy.dialog.confirm(dialogConfig);
    }
  },
  filters: {
    formatReserver
  }
});
