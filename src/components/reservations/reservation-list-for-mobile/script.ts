import Vue, { PropType} from "vue";
import { Reservation } from "@/entity/reservation";

export default Vue.extend({
  template: "<reservation-list-for-mobile/>",
  props: {
    reservations: {
      required: true,
      type: Array as PropType<Reservation[]>
    }
  }
});
