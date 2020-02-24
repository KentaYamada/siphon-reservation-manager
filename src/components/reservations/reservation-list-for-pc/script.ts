import Vue, { PropType } from "vue";
import { Reservation } from "@/entity/reservation";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import { formatReserver } from "@/filters/format-reserver";

export default Vue.extend({
  template: "<reservation-list-for-pc/>",
  props: {
    reservations: {
      required: true,
      type: Array as PropType<Reservation[]>
    },
    hasItems: {
      required: true,
      type: Boolean
    }
  },
  filters: {
    formatReservationDatetime,
    formatReserver
  }
});
