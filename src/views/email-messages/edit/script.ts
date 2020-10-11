import Vue from "vue";
import { BNoticeConfig } from "buefy/types/components";
import { tap } from "rxjs/operators";
import EmailMessageEditForm from "@/components/email-message/form/EmailMessageEditForm.vue";
import { EmailMessage } from "@/entity/email-message";
import { EMAIL_MESSAGE_LIST_URL } from "@/router/url";
import { EmailMessageService } from "@/services/firestore/email-message-service";

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
  computed: {
    redirectUrl(): string {
      return EMAIL_MESSAGE_LIST_URL;
    }
  },
  methods: {
    handleEditSucceeded() {
      const config: BNoticeConfig = {
        message: "変更しました",
        type: "is-success"
      };
      this.$buefy.toast.open(config);
      this.$router.push({ path: EMAIL_MESSAGE_LIST_URL });
    },

    handleEditFailed() {
      const config: BNoticeConfig = {
        message: "変更に失敗しました",
        type: "is-danger"
      };
      this.$buefy.toast.open(config);
    },

    handleValidationFailed() {
      const config: BNoticeConfig = {
        message: "入力内容に誤りがあります。エラーメッセージを確認してください。",
        type: "is-danger"
      };
      this.$buefy.toast.open(config);
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
  },
  mounted() {
    this.isLoading = true;

    EmailMessageService.fetchById(this.id)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(
        (message: EmailMessage) => {
          this.message = message;
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
