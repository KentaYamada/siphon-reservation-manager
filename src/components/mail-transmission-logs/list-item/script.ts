import Vue, { PropType } from "vue";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";
import { formatDateJp } from "@/filters/format-date-jp";

/**
 * Mail transmission log list item component
 */
export default Vue.extend({
  name: "mail-transmission-log-list-item",
  filters: {
    formatDateJp
  },
  props: {
    mailTransmissionLog: {
      required: true,
      type: Object as PropType<MailTransmissionLog>
    }
  },
  computed: {
    visibleReservationDetailLink(): boolean {
      return this.mailTransmissionLog.type !== "cancel_reservation";
    }
  },
  template: "<mail-transmission-log-list-item/>"
});
