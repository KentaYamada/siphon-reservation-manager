import Vue, { PropType } from "vue";
import SelectableReservationSeatListItem from "@/components/reservation-seats/selectable-list-item/SelectableReservationSeatListItem.vue";
import { ReservationSeat } from "@/entity/reservation-seat";

/**
 * Selectable Reservation seat list component
 */
export default Vue.extend({
  name: "selectbale-reservation-seat-list",
  props: {
    reservationSeats: {
      required: true,
      type: Array as PropType<Array<ReservationSeat>>
    }
  },
  components: {
    SelectableReservationSeatListItem
  },
  methods: {
    handleUpdateReservationSeat(seatNo: number): void {
      this.$emit("update-reservation-seat", seatNo);
    }
  },
  template: "<selectable-reservation-seat-list/>"
});
