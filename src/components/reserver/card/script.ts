import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { BDialogConfig, BModalConfig } from "buefy/types/components";
import ReservationAddressDialog from "@/components/reservations/dialog/address/ReservationAddressDialog.vue";
import { Reserver } from "@/entity/reserver";
import { formatReserver } from "@/filters/format-reserver";
import { nl2br } from "@/filters/nl2br";
import { CANCEL } from "@/store/constant";

export default Vue.extend({
  template: "<reserver-card/>",
  props: {
    reserver: {
      required: true,
      type: Object as PropType<Reserver>
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
