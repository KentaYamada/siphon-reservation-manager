import Vue, { PropType } from "vue";
import { Reserver } from "@/entity/reserver";
import { ReservationCancelLog } from "@/entity/reservation-cancel-log";

export default Vue.extend({
  props: {
    reserver: {
      required: true,
      type: Object as PropType<Reserver | ReservationCancelLog>
    }
  }
});
