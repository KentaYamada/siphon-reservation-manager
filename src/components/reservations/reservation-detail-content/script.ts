import Vue, { PropType } from "vue";
import { Reservation } from "@/entity/reservation";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import ReservationSeats from "@/components/reservations/reservation-seats/ReservationSeats.vue";

export default Vue.extend({
  template: "<reservation-detail-content/>",
  components: {
    ReservationSeats
  },
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
