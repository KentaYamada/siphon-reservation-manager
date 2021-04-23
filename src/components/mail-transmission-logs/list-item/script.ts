import Vue, { PropType } from "vue";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";
import { formatDateTimeJp } from "@/filters/format-datetime-jp";

/**
 * Mail transmission log list item component
 */
export default Vue.extend({
  name: "mail-transmission-log-list-item",
  filters: {
    formatDateTimeJp
  },
  props: {
    mailTransmissionLog: {
      required: true,
      type: Object as PropType<MailTransmissionLog>
    }
  },
  computed: {
    tagColor(): string {
      if (this.mailTransmissionLog.type.indexOf("create") > -1) {
        return "is-info";
      } else if (this.mailTransmissionLog.type.indexOf("edit") > -1) {
        return "is-success";
      } else if (this.mailTransmissionLog.type.indexOf("cancel") > -1) {
        return "is-danger";
      } else {
        return "";
      }
    },

    visibleReservationDetailLink(): boolean {
      return this.mailTransmissionLog.type !== "cancel_reservation";
    }
  },
  template: "<mail-transmission-log-list-item/>"
});
