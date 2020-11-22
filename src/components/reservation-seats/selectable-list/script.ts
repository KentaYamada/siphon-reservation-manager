import Vue, { PropType } from "vue";
import { filter, isEmpty } from "lodash";
import { tap } from "rxjs/operators";
import SelectableReservationSeatListItem from "@/components/reservation-seats/selectable-list-item/SelectableReservationSeatListItem.vue";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import { ReservationService } from "@/services/firestore/reservation-service";

export default Vue.extend({
  template: "<selectable-reservation-seat-list/>",
  components: {
    SelectableReservationSeatListItem
  },
  props: {
    searchParams: {
      required: true,
      type: Object as PropType<ReservationSeatSearchOption>
    }
  },
  computed : {
    reservablePeople(): number {
      if (!this.seats) {
        return 0;
      }

      const reservedCount = filter(this.seats, (seat => seat.is_reserved)).length;
      const selectedCount = filter(this.seats, (seat => seat.is_selected)).length;

      // 2名席/テーブルで計算
      const total = reservedCount * 2 + selectedCount * 2;

      return ReservationService.MAX_NUMBER_OF_RESERVATIONS - total;
    },

    hasSeats() : boolean {
      return this.seats.length > 0;
    },

    noSelectedSeats(): boolean {
      return filter(this.seats, seat => seat.is_selected).length === 0;
    },

    isAllReservedSeats(): boolean {
      return ReservationService.MAX_NUMBER_OF_RESERVATIONS === filter(this.seats, seats => seats.is_reserved).length;
    }

  },
  methods: {
    handleUpdateSeat(selected: boolean, no: number) {
      this.$emit("update-seat", selected, no);
    }
  },
  watch: {
    searchParams: {
      deep: true,
      handler(newVal: ReservationSeatSearchOption) {
          this.isProgress = true;
          ReservationService.fetchSeats(newVal)
            .pipe(tap(() => this.isProgress = false))
            .subscribe(
                (seats: Array<ReservationSeat>) => {
                  console.log(seats);
                  this.seats = seats;
                  this.$emit("update-is-all-reserved-seats", this.isAllReservedSeats);
                },
                (error) => console.error(error)
            );
        // if (!isEmpty(newVal.reservation_date_id) && !isEmpty(newVal.reservation_time_id)) {
        //   ReservationService.fetchSeats(newVal)
        //     .pipe(tap(() => this.isProgress = false))
        //     .subscribe(
        //         (seats: Array<ReservationSeat>) => {
        //           console.log(seats);
        //           this.seats = seats;
        //           this.$emit("update-is-all-reserved-seats", this.isAllReservedSeats);
        //         },
        //         (error) => console.error(error)
        //     );
        // } else {
        //   this.seats = [];
        // }
      }
    }
  },
  data() {
    return {
      seats: [] as Array<ReservationSeat>,
      isProgress: false
    };
  }
});
