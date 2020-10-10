import Vue, { PropType } from "vue";
import { EmailMessage } from "@/entity/email-message";

export default Vue.extend({
  template: "<email-message-list-item/>",
  props: {
    message: {
      required: true,
      type: Object as PropType<EmailMessage>
    }
  }
});
