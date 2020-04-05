import Vue, { PropType } from "vue";

// plugin
import moment from "moment";

// component
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";

// entity
import { Reservation } from "@/entity/reservation";

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
  computed: {
    reservationDateTime(): string {
      let reservationDate ='';
      let startTime = '';
      let endTime = '';

      if (this.reservation.reservation_date) {
        reservationDate = moment(this.reservation.reservation_date).format("YYYY年MM月DD日");
      }

      if (this.reservation.reservation_start_time) {
        startTime = moment(this.reservation.reservation_start_time).format("HH:mm");
      }

      if (this.reservation.reservation_end_time) {
        endTime = moment(this.reservation.reservation_end_time).format("HH:mm");
      }

      return `${reservationDate} ${startTime} - ${endTime}`;
    }
  },
});
