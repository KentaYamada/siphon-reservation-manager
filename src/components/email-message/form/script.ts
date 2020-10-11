import Vue, { PropType } from "vue";
import { BModalConfig } from "buefy/types/components";
import { required } from "vuelidate/lib/validators";
import EmailMessagePreviewDialog from "@/components/email-message/preview-dialog/EmailMessagePreviewDialog.vue";
import { EmailMessage } from "@/entity/email-message";
import { EmailMessageService } from "@/services/firestore/email-message-service";

export default Vue.extend({
  template: "<email-message-edit-form/>",
  props: {
    message: {
      required: true,
      type: Object as PropType<EmailMessage>
    }
  },
  validations: {
    message: {
      subject: {
        required
      },
      body: {
        required
      }
    }
  },
  methods: {
    handleSave() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.$emit("validation-failed");
      } else {
        EmailMessageService.edit(this.message).subscribe(
          () => {
            this.$emit("edit-succeeded");
          },
          () => {
            this.$emit("edit-failed");
          }
        );
      }
    },

    handlePreview() {
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
