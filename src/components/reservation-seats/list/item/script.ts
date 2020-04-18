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
  data() {
    let selectedColor = "";

    if (this.reservationSeat.is_selected) {
      selectedColor = "is-selected";
    } else {
      if (this.reservationSeat.is_reserved) {
        selectedColor = "is-reserved";
      }
    }

    return {
      seatPositionCss: `no${this.reservationSeat.seat_no}`,
      seatColorCss: selectedColor
    };
  }
});
