import Vue, { PropType } from "vue";
import { Reservation } from "@/entity/reservation";

export default Vue.extend({
  template: "<reservation-list-for-pc/>",
  props: {
    reservations: {
      required: true,
      type: Array as PropType<Reservation[]>
    },
    hasItems: {
      required: true,
      type: Boolean
    }
  }
});
