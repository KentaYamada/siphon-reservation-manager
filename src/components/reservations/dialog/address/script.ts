import Vue, { PropType } from "vue";
import { Reservation } from "@/entity/reservation";

export default Vue.extend({
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    }
  },
  computed: {
    mailTo(): string {
      return "mailto:".concat(this.reservation.mail);
    }
  }
});
