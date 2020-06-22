import Vue, { PropType } from "vue";

// plugin
import moment from "moment";

// component
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";

// entity
import { Reservation } from "@/entity/reservation";

import { nl2br } from "@/filters/nl2br";

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
      let reservationDate = "";
      let startTime = "";
      let endTime = "";

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
    },
    reserverName(): string {
      return `${this.reservation.reserver_name}様 (${this.reservation.number_of_reservations}名)`;
    },
    reservationComment(): string {
      return nl2br(this.reservation.comment);
    }
  }
});
