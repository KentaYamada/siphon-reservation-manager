import Vue, { PropType } from "vue";
import { tap } from "rxjs/operators";
import ReservationListItem from "@/components/reservations/list-item/ReservationListItem.vue";
import { ReservationByDate } from "@/entity/reservation-by-date";
import { Reservation } from "@/entity/reservation";
import { ReservationService } from '@/services/firestore/reservation-service';
import { ReservationSearchOption } from '@/entity/reservation-search-option';

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
      this._fetch(this.searchParams);
      this.$emit("cancel-succeeded");
    },

    handleCancelFailed() {
      this.$emit("cancel-failed");
    },

    _fetch(searchParams: ReservationSearchOption) {
      if (searchParams.reservation_date_id !== "") {
        this.$emit("update-progress", true);

        ReservationService.fetch(searchParams)
          .pipe(
            tap(() => this.$emit("update-progress", false))
          )
          .subscribe(
            (reservations: Array<Reservation>) => console.log(reservations)
          );
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
    }
  }
});
