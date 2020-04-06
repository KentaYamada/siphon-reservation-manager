import Vue, { PropType } from "vue";

// component
import SelectableReservationSeatListItem from "@/components/reservation-seats/selectable-list/item/SelectableReservationSeatListItem.vue";

// entity
import { ReservationSeat } from "@/entity/reservation-seat";

export default Vue.extend({
  template: "<selectable-reservation-seat-list/>",
  props: {
    reservationSeats: {
      required: true,
      type: Array as PropType<ReservationSeat[]>
    }
  },
  components: {
    SelectableReservationSeatListItem
  }
});
