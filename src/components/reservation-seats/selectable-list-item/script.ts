import Vue, { PropType } from "vue";
import { ReservationSeat } from "@/entity/reservation-seat";

export default Vue.extend({
  template: "<selectable-reservation-seat-list-item/>",
  props: {
    seat: {
      required: true,
      type: Object as PropType<ReservationSeat>
    }
  },
  computed: {
    seatNo(): string {
      return `seat-no${this.seat.seat_no}`;
    },

    seatPositionCss(): string {
      return `no${this.seat.seat_no}`;
    }
  },
  methods: {
    handleUpdateSeat(e: Event): void {
      if (e.target instanceof HTMLInputElement) {
        this.$emit("update-seat", e.target.checked, this.seat.seat_no);
      }
    }
  }
});
