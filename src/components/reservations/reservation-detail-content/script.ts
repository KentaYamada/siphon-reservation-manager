import Vue, { PropType } from "vue";
import { Reservation } from "@/entity/reservation";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";

export default Vue.extend({
  template: "<reservation-detail-content/>",
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    }
  },
  filters: {
    formatReservationDatetime
  }
});
