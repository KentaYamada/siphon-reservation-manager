import Vue, { PropType } from "vue";
import { ReservationListSeat } from "@/entity/reservation-list-seat";

export default Vue.extend({
  props: {
    seat: {
      required: true,
      type: Object as PropType<ReservationListSeat>
    }
  }
});
