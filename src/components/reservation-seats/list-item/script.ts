import Vue, { PropType } from "vue";
import { ReservationSeat } from "@/entity/reservation-seat";

export default Vue.extend({
  template: "<reservation-seat-list-item/>",
  props: {
    seat: {
      required: true,
      type: Object as PropType<ReservationSeat>
    }
  },
  computed: {
    seatColorCss(): string {
      if (this.seat.is_selected) {
        return "selected";
      } else if (this.seat.is_reserved) {
        return "reserved";
      } else {
        return "";
      }
    },

    seatPositionCss(): string {
      return `no${this.seat.seat_no}`;
    }
  }
});
