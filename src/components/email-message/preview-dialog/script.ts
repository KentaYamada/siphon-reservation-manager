import Vue, { PropType } from "vue";
import { EmailMessage } from "@/entity/email-message";
import { nl2br } from "@/filters/nl2br";

export default Vue.extend({
  props: {
    message: {
      required: true,
      type: Object as PropType<EmailMessage>
    }
  },
  computed: {
    body(): string {
      const replacedMessage = this.message.body
        .replace("{予約者名}", "Gamoyon花子")
        .replace("{予約サイトURL}", `${location.origin}/reservations`);
      return nl2br(replacedMessage);
    }
  }
});
