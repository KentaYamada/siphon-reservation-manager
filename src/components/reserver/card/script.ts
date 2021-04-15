import Vue, { PropType } from "vue";
import { BModalConfig } from "buefy/types/components";
import { chain } from "lodash";
import ReservationAddressDialog from "@/components/reservations/dialog/address/ReservationAddressDialog.vue";
import { Reservation } from "@/entity/reservation";
import { formatReserver } from "@/filters/format-reserver";
import { nl2br } from "@/filters/nl2br";

export default Vue.extend({
  name: "reserver-card",
  filters: {
    formatReserver
  },
  props: {
    reserver: {
      required: true,
      type: Object as PropType<Reservation>
    }
  },
  computed: {
    comment(): string {
      return nl2br(this.reserver.comment);
    },
    seatNo(): string {
      return chain(this.reserver.reservation_seats)
        .filter(s => s.is_selected)
        .map(s => s.seat_no)
        .value()
        .join(", ");
    }
  },
  methods: {
    handleShowAddressDialog(): void {
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

    handleCancel(): void {
      this.$emit("cancel", this.reserver.id);
    }
  },
  template: "<reserver-card/>"
});
