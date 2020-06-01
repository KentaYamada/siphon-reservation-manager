import Vue, { PropType } from "vue";
import { ReservationSeat } from "@/entity/reservation-seat";
import ReservationSeatListItem from "@/components/reservation-seats/list/item/ReservationSeatListItem.vue";

export default Vue.extend({
  template: "<reservation-seat-list/>",
  components: {
    ReservationSeatListItem
  },
  props: {
    reservationSeats: {
      required: true,
      type: Array as PropType<ReservationSeat[]>
    }
  }
});
