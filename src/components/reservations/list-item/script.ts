import Vue, { PropType } from "vue";

// entity
import { Reservation } from "@/entity/reservation";

// filter
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import { formatReserver } from "@/filters/format-reserver";

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
  }
});
