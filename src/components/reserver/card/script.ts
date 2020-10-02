import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { BDialogConfig, BModalConfig, BNoticeConfig } from "buefy/types/components";
import ReservationAddressDialog from "@/components/reservations/dialog/address/ReservationAddressDialog.vue";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";
import { Reservation } from "@/entity/reservation";
import { ReservationListSeat } from "@/entity/reservation-list-seat";
import { formatReserver } from "@/filters/format-reserver";
import { nl2br } from "@/filters/nl2br";
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
  computed: {
    comment(): string {
      return nl2br(this.reserver.comment);
    },
    seatNo(): string {
      return this.reserver.seat_nos.join(", ");
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
              const reservation: Reservation = {
                id: this.reserver.reservation_id,
                reservation_date: null,
                reservation_date_id: "",
                reservation_start_time: null,
                reservation_end_time: null,
                reservation_time_id: "",
                reserver_name: this.reserver.reserver_name,
                reservation_seats: [],
                number_of_reservations: null,
                tel: this.reserver.tel,
                mail: this.reserver.mail,
                comment: ""
              };
              const href = this.$router.resolve({ path: "/" }).href;
              const redirectUrl = `${location.origin}${href}`;

              sendEmail(reservation, reservation.id as string, redirectUrl, EMAIL_MESSAGE_TEMPLATES.CANCELED);

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
