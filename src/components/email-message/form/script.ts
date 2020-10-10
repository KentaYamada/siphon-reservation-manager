import Vue, { PropType } from "vue";
import { BModalConfig } from "buefy/types/components";
import EmailMessagePreviewDialog from "@/components/email-message/preview-dialog/EmailMessagePreviewDialog.vue";
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
      const config: BModalConfig = {
        parent: this,
        component: EmailMessagePreviewDialog,
        hasModalCard: true,
        props: {
          message: this.message
        }
      };

      this.$buefy.modal.open(config);
    }
  }
});
