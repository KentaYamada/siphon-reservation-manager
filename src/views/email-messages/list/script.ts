import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import { tap } from "rxjs/operators";
import EmailMessageList from "@/components/email-message/list/EmailMessageList.vue";
import { EmailMessage } from "@/entity/email-message";
import { EmailMessageService } from "@/services/firestore/email-message-service";

export default Vue.extend({
  components: {
    EmailMessageList
  },
  data() {
    return {
      messages: [] as Array<EmailMessage>,
      isLoading: false
    };
  },
  created() {
    this.messages = [];
  },
  mounted() {
    this.isLoading = true;
    EmailMessageService.fetch()
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(
        (messages: Array<EmailMessage>) => {
          this.messages = messages;
        },
        () => {
          const config: BNoticeConfig = {
            message: "データの取得に失敗しました",
            type: "is-danger"
          };
          this.$buefy.toast.open(config);
        }
      );
  }
});
