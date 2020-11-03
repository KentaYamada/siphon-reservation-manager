import Vue from "vue";
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
    },
    handleCancelFailed() {
      this.$emit("cancel-failed");
    },
    handleUpdateProgress(isProgress: boolean) {
      this.$emit("update-progress", isProgress);
    }
  },
  data() {
    return {
      reservations: [] as Array<NewYearDishesReservation>
    };
  },
  mounted() {
    this.$emit("update-progress", true);

    NewYearDishesReservationService.fetch().subscribe(
      (reservations: Array<NewYearDishesReservation>) => {
        this.reservations = reservations;
      },
      () => {
        this.$emit("load-failed");
      },
      () => {
        this.$emit("update-progress", false);
      }
    );
  }
});
