import Vue, { PropType } from "vue";
import { ReservationSeat } from "@/entity/reservation-seat";

export default Vue.extend({
  template: "<reservation-seats-item/>",
  props: {
    reservationSeat: {
      required: true,
      type: Object as PropType<ReservationSeat>
    }
  },
  data() {
    return {
      seatPositionCss: `no${this.reservationSeat.seat_no}`
    };
  }
});
