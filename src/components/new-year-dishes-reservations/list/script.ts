import Vue from "vue";
import { tap } from "rxjs/operators";
import NewYearDishesReservationListItem from "@/components/new-year-dishes-reservations/list-item/NewYearDishesReservationListItem.vue";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";

export default Vue.extend({
  template: "<new-year-dishes-reservation-list/>",
  components: {
    NewYearDishesReservationListItem
  },
  methods: {
    handleCancelSucceeded() {
      this.$emit("cancel-succeeded");
      this._fetch();
    },

    handleCancelFailed() {
      this.$emit("cancel-failed");
    },

    handleUpdateProgress(isProgress: boolean) {
      this.$emit("update-progress", isProgress);
    },

    _fetch() {
      this.$emit("update-progress", true);

      NewYearDishesReservationService.fetch()
        .pipe(tap(() => this.$emit("update-progress", false)))
        .subscribe(
          (reservations: Array<NewYearDishesReservation>) => {
            this.reservations = reservations;
            this.$emit("update-current-receptions", reservations.length);
          },
          () => this.$emit("load-failed")
        );
    }
  },
  data() {
    return {
      reservations: [] as Array<NewYearDishesReservation>
    };
  },
  mounted() {
    this._fetch();
  }
});
