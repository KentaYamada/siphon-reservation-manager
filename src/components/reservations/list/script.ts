import Vue, { PropType } from "vue";
import { groupBy, map, mergeMap, tap, toArray } from "rxjs/operators";
import ReservationListItem from "@/components/reservations/list-item/ReservationListItem.vue";
import { ReservationByDate } from "@/entity/reservation-by-date";
import { Reservation } from "@/entity/reservation";
import { ReservationService } from "@/services/firestore/reservation-service";
import { ReservationSearchOption } from "@/entity/reservation-search-option";

export default Vue.extend({
  template: "<reservation-list/>",
  components: {
    ReservationListItem
  },
  props: {
    searchParams: {
      required: true,
      type: Object as PropType<ReservationSearchOption>
    }
  },
  computed: {
    hasItems(): boolean {
      return this.reservations.length > 0;
    }
  },
  methods: {
    handleCancelSucceeded() {
      this.$emit("cancel-succeeded");
      this._fetch(this.searchParams);
    },

    handleCancelFailed() {
      this.$emit("cancel-failed");
    },

    _fetch(searchParams: ReservationSearchOption) {
      if (searchParams.reservation_date_id !== "") {
        this.$emit("update-progress", true);

        ReservationService.fetch(searchParams)
          .pipe(
            groupBy(value => value.reservation_start_time),
            mergeMap(value => value.pipe(toArray())),
            map(value => {
              const reservationByDate: Array<ReservationByDate> = value.map(v => {
                const data: ReservationByDate = {
                  reservation_date: v[0].reservation_date as Date,
                  reservation_date_id: v[0].reservation_date_id,
                  reservation_start_time: v[0].reservation_start_time as Date,
                  reservation_end_time: v[0].reservation_end_time as Date,
                  reservation_time_id: v[0].reservation_time_id,
                  reservations: v
                };

                return data;
              });

              return reservationByDate;
            }),
            tap(() => this.$emit("update-progress", false))
          )
          .subscribe((reservations: Array<ReservationByDate>) => (this.reservations = reservations));
      }
    }
  },
  watch: {
    searchParams: {
      deep: true,
      handler(newVal: ReservationSearchOption) {
        this._fetch(newVal);
      }
    }
  },
  data() {
    return {
      reservations: [] as Array<ReservationByDate>
    };
  }
});
