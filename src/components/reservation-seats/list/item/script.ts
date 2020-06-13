import Vue, { PropType } from "vue";
import { ReservationSeat } from "@/entity/reservation-seat";

export default Vue.extend({
  template: "<reservation-seat-list-item/>",
  props: {
    reservationSeat: {
      required: true,
      type: Object as PropType<ReservationSeat>
    }
  },
  computed: {
    seatColorCss(): string {
      let selectedColor = "";

      if (this.reservationSeat.is_selected) {
        selectedColor = "selected";
      } else {
        if (this.reservationSeat.is_reserved) {
          selectedColor = "reserved";
        }
      }

      return selectedColor;
    },
    seatPositionCss(): string {
      return `no${this.reservationSeat.seat_no}`;
    }
  }
});
