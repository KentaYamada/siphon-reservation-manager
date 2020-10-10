import Vue, { PropType } from "vue";
import EmailMessageListItem from "@/components/email-message/list-item/EmailMessageListItem.vue";
import { EmailMessage } from "@/entity/email-message";

export default Vue.extend({
  template: "<email-message-list/>",
  components: {
    EmailMessageListItem
  },
  props: {
    messages: {
      required: true,
      type: Array as PropType<Array<EmailMessage>>
    }
  },
  computed: {
    hasItems(): boolean {
      return !!this.messages && this.messages.length > 0;
    }
  }
});
