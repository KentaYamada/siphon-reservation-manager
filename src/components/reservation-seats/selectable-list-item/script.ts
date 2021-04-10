import Vue, { PropType } from "vue";
import { ReservationSeat } from "@/entity/reservation-seat";

/**
 * Selectable Reservation seat item component
 */
export default Vue.extend({
  name: "selectable-reservation-seat-list-item",
  props: {
    reservationSeat: {
      required: true,
      type: Object as PropType<ReservationSeat>
    }
  },
  computed: {
    seatNo(): string {
      return `seat-no${this.reservationSeat.seat_no}`;
    },

    seatPositionCss(): string {
      return `no${this.reservationSeat.seat_no}`;
    }
  },
  methods: {
    handleUpdateReservationSeat(): void {
      this.$emit("update-reservation-seat", this.reservationSeat.seat_no);
    }
  },
  template: "<selectable-reservation-seat-list-item/>"
});
