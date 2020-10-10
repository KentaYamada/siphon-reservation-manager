import Vue, { PropType } from "vue";
import { EmailMessage } from "@/entity/email-message";

export default Vue.extend({
  template: "<email-message-edit-form/>",
  props: {
    message: {
      required: true,
      type: Object as PropType<EmailMessage>
    }
  },
  methods: {
    handleSave() {
      console.log("save");
    },
    handlePreview() {
      console.log("preview");
    }
  }
});
