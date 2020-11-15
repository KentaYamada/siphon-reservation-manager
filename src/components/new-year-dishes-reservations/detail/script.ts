import Vue from "vue";
import { tap } from "rxjs/operators";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import { nl2br } from "@/filters/nl2br";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";

export default Vue.extend({
  template: "<new-year-dishes-reservation-detail/>",
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    visibleContent(): boolean {
      return !!this.model;
    },
    comment(): string {
      return this.model?.comment ? nl2br(this.model.comment) : "";
    }
  },
  data() {
    return {
      model: {} as NewYearDishesReservation
    };
  },
  mounted() {
    this.$emit("update-progress", true);

    NewYearDishesReservationService.fetchById(this.id)
      .pipe(tap(() => this.$emit("update-progress", false)))
      .subscribe(
        (model: NewYearDishesReservation) => {
          this.model = model;
        },
        () => {
          this.$emit("load-failed");
        },
        () => {
          if (!this.model.id) {
            this.$router.push({ name: "notfound" });
          }
        }
      );
  }
});
