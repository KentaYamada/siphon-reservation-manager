import Vue from "vue";
import EmailMessageEditForm from "@/components/email-message/form/EmailMessageEditForm.vue";
import { EmailMessage } from "@/entity/email-message";

export default Vue.extend({
  components: {
    EmailMessageEditForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      isLoading: false,
      message: {
        id: "",
        theme: "",
        subject: "",
        body: ""
      } as EmailMessage
    };
  }
});
