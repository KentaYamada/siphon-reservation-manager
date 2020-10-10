import Vue, { PropType } from "vue";
import { EmailMessage } from "@/entity/email-message";

export default Vue.extend({
  template: "<email-message-list-item/>",
  props: {
    message: {
      required: true,
      type: Object as PropType<EmailMessage>
    }
  },
  methods: {
    handleEditMessage() {
      this.$router.push({
        name: "email-message-edit",
        params: {
          id: this.message.id
        }
      });
    }
  }
});
