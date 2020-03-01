import Vue, { PropType } from "vue";
import { ReservationSeat } from "@/entity/reservation-seat";
import ReservationSeatsItem from "@/components/reservations/reservation-seats-item/ReservationSeatsItem.vue";

export default Vue.extend({
  template: "<reservation-seats/>",
  components: {
    ReservationSeatsItem
  },
  props: {
    reservationSeats: {
      required: true,
      type: Array as PropType<ReservationSeat[]>
    }
  }
});
