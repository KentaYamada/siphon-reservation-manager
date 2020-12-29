import Vue from "vue";
import ReservationAddressDialog from "@/components/reservations/dialog/address/ReservationAddressDialog.vue";
import { ReservationCancelLog } from "@/entity/reservation-cancel-log";
import { BModalConfig } from "buefy/types/components";
import { formatDateJp } from "@/filters/format-date-jp";

export default Vue.extend({
  template: "<reservation-cancel-log-list-item/>",
  computed: {
    seats(): string {
      return this.item.seats.join(", ");
    }
  },
  filters: {
    formatDateJp
  },
  methods: {
    handleShowAddressDialog(): void {
      const config: BModalConfig = {
        component: ReservationAddressDialog,
        hasModalCard: true,
        parent: this,
        props: {
          reserver: this.item
        }
      };

      this.$buefy.modal.open(config);
    }
  },
  data() {
    return {
      item: {
        id: "1",
        canceled_at: new Date(),
        reservation_id: "abc",
        reservation_date: new Date(),
        reserver_name: "Gamoyon 花子",
        mail: "sweets.sukiko@email.com",
        tel: "09012345678",
        seats: [1, 2]
      } as ReservationCancelLog
    };
  }
});
