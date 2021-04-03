import Vue, { PropType } from "vue";
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";
import { nl2br } from "@/filters/nl2br";
import { Reservation } from "@/entity/reservation";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import { reserverNameWithNumberOfPeople } from "@/filters/reserver-name-with-number-of-people";

export default Vue.extend({
  name: "reservation-detail-content",
  components: {
    ReservationSeatList
  },
  filters: {
    formatReservationDatetime,
    reserverNameWithNumberOfPeople
  },
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    }
  },
  computed: {
    reservationComment(): string {
      return nl2br(this.reservation.comment);
    }
  },
  template: "<reservation-detail-content/>"
});
