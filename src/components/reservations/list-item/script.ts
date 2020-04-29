import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { DialogConfig, ToastConfig } from "buefy/types/components";

// entity
import { Reservation } from "@/entity/reservation";

// filter
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import { formatReserver } from "@/filters/format-reserver";

// store
import { CANCEL } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-list-item/>",
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
              const toastConfig: ToastConfig = {
                message: "予約取消しました",
                type: "is-danger"
              };

              this.$buefy.toast.open(toastConfig);
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
    }
  }
});
