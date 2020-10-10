import Vue, { PropType } from "vue";
import { BModalConfig } from "buefy/types/components";
import EmailMessageEditDialog from "@/components/email-message/dialog/EmailMessageEditDialog.vue";
import { EmailMessage } from "@/entity/email-message";
import { EMAIL_MESSAGE_EDIT_URL } from "@/router/url";

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
        path: EMAIL_MESSAGE_EDIT_URL,
        params: {
          id: this.message.id
        }
      });
    }
  }
});
