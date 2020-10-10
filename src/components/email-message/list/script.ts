import Vue, { PropType } from "vue";
import EmailMessageListItem from "@/components/email-message/list-item/EmailMessageListItem.vue";

export default Vue.extend({
  template: "<email-message-list/>",
  components: {
    EmailMessageListItem
  }
});
