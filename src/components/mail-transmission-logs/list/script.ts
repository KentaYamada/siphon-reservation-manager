import Vue, { PropType } from "vue";
import MailTransmissionLogListItem from "@/components/mail-transmission-logs/list-item/MailTransmissionLogListItem.vue";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";

/**
 * Mail transmission log list component
 */
export default Vue.extend({
  name: "mail-transmission-log-list",
  props: {
    mailTransmissionLogs: {
      required: true,
      type: Array as PropType<Array<MailTransmissionLog>>
    }
  },
  components: {
    MailTransmissionLogListItem
  },
  template: "<mail-transmission-log-list/>"
});
