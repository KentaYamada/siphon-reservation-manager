import Vue, { PropType } from "vue";
import { EmailMessage } from "@/entity/email-message";
import { nl2br } from "@/filters/nl2br";

export default Vue.extend({
  template: "<email-message-list-item/>",
  props: {
    message: {
      required: true,
      type: Object as PropType<EmailMessage>
    }
  },
  computed: {
    body(): string {
      return nl2br(this.message.body);
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
