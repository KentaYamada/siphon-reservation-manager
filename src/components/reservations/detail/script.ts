import Vue from "vue";
import { tap } from "rxjs/operators";
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";
import { Reservation } from "@/entity/reservation";
import { nl2br } from "@/filters/nl2br";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import { reserverNameWithNumberOfPeople } from "@/filters/reserver-name-with-number-of-people";
import { ReservationService } from "@/services/firestore/reservation-service";

export default Vue.extend({
  template: "<reservation-detail-content/>",
  components: {
    ReservationSeatList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    reservationComment(): string {
      return nl2br(this.reservation.comment);
    }
  },
  /*methods: {
    
  },*/
  filters: {
    formatReservationDatetime,
    reserverNameWithNumberOfPeople
  },
  data() {
    const reservation: Reservation = {
      reservation_date: null,
      reservation_date_id: "",
      reservation_start_time: null,
      reservation_end_time: null,
      reservation_time_id: "",
      reserver_name: "",
      reservation_seats: [],
      number_of_reservations: null,
      tel: "",
      mail: "",
      comment: ""
    };

    return {
      reservation
    };
  },
  mounted() {
    this.$emit("update-progress", true);

    ReservationService.fetchById(this.id)
      .pipe(tap(() => this.$emit("update-progress", false)))
      .subscribe(
        (reservation: Reservation) => this.reservation = reservation,
        () => this.$emit("load-failed")
      );
  }
});
