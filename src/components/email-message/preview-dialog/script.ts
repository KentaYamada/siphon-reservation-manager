import Vue, { PropType } from "vue";
import { EmailMessage } from "@/entity/email-message";

export default Vue.extend({
  props: {
    message: {
      required: true,
      type: Object as PropType<EmailMessage>
    }
  }
});
