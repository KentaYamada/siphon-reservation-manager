import Vue, { PropType } from "vue";
import { BDialogConfig, BModalConfig } from "buefy/types/components";
import NewYearDishesReservationAddressDialog from "@/components/new-year-dishes-reservations/dialog/address/NewYearDishesReservationAddressDialog.vue";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";

export default Vue.extend({
  template: "<new-year-dishes-reservation-list-item/>",
  props: {
    reservation: {
      required: true,
      type: Object as PropType<NewYearDishesReservation>
    }
  },
  methods: {
    handleShowAddressDialog() {
      const config: BModalConfig = {
        parent: this,
        component: NewYearDishesReservationAddressDialog,
        hasModalCard: true,
        props: {
          reservation: this.reservation
        }
      };

      this.$buefy.modal.open(config);
    },
    handleCancel() {
      const message = `
            <p>${this.reservation.reserver_name}様の予約を取り消しますか？</p>
            <small>取り消した予約は元に戻せません</small>
        `;
      const config: BDialogConfig = {
        type: "is-danger",
        message: message,
        confirmText: "はい",
        cancelText: "いいえ",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle"
      };
      this.$buefy.dialog.confirm(config);
    }
  }
});
