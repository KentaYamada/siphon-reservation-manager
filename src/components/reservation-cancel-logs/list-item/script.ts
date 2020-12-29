import Vue, { PropType } from "vue";
import { BModalConfig } from "buefy/types/components";
import ReservationAddressDialog from "@/components/reservations/dialog/address/ReservationAddressDialog.vue";
import { ReservationCancelLog } from "@/entity/reservation-cancel-log";
import { formatDateJp } from "@/filters/format-date-jp";

export default Vue.extend({
  template: "<reservation-cancel-log-list-item/>",
  props: {
    item: {
      required: true,
      type: Object as PropType<ReservationCancelLog>
    }
  },
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
  }
});
