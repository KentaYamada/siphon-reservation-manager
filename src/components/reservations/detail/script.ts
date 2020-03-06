import Vue, { PropType } from "vue";
import { Reservation } from "@/entity/reservation";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";

export default Vue.extend({
  template: "<reservation-detail-content/>",
  components: {
    ReservationSeatList
  },
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    }
  },
  filters: {
    formatReservationDatetime
  }
});
