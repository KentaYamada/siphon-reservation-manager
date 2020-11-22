import Vue, { PropType } from "vue";
import { tap } from 'rxjs/operators';
import ReservationSeatListItem from "@/components/reservation-seats/list/item/ReservationSeatListItem.vue";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import { ReservationService } from "@/services/firestore/reservation-service";

export default Vue.extend({
  template: "<reservation-seat-list/>",
  components: {
    ReservationSeatListItem
  },
  props: {
    searchParams: {
      required: true,
      type: Object as PropType<ReservationSeatSearchOption>
    }
  },
  watch: {
    searchParams: {
      deep: true,
      handler(newVal: ReservationSeatSearchOption) {
        if (newVal.reservation_date_id !== "" && newVal.reservation_time_id !== "") {
          ReservationService.fetchSeats(newVal)
            .pipe(tap(() => this.$emit("update-progress", false)))
            .subscribe(
              (seats: Array<ReservationSeat>) => this.seats = seats,
              () => this.$emit("load-failed")
            );
        }
      }
    }
  },
  data() {
    return {
      seats: [] as Array<ReservationSeat>
    }
  }
});
