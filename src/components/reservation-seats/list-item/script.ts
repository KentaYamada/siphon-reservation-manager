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
      let selectedColor = "";

      if (this.seat.is_selected) {
        selectedColor = "selected";
      } else {
        if (this.seat.is_reserved) {
          selectedColor = "reserved";
        }
      }

      return selectedColor;
    },
    seatPositionCss(): string {
      return `no${this.seat.seat_no}`;
    }
  }
});
