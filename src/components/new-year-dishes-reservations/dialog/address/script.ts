import Vue, { PropType } from "vue";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";

export default Vue.extend({
  props: {
    reservation: {
      required: true,
      type: Object as PropType<NewYearDishesReservation>
    }
  }
});
