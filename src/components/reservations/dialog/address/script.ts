import Vue, { PropType } from "vue";
import { Reservation } from "@/entity/reservation";

export default Vue.extend({
  props: {
    reserver: {
      required: true,
      type: Object as PropType<Reservation>
    }
  }
});
