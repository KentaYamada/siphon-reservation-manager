import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { BNoticeConfig } from "buefy/types/components";
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";
import _ from "lodash";
import { sendEmail } from "@/utility/email-utility";

export default Vue.extend({
  components: {
    ReservationForm
  },
  computed: {
    ...mapState("reservation", ["reservation"])
  },
  methods: {
    handleInitializing(): void {
      this.isProgressing = true;
    },

    handleInitialized(): void {
      this.isProgressing = false;
    },

    handleInitializeFailure(): void {
      // todo: redirect 503 page
      const toastConfig: BNoticeConfig = {
        message: "データの初期化に失敗しました",
        type: "is-danger"
      };
      this.isProgressing = false;
      this.$buefy.toast.open(toastConfig);
    },

    handleSaving(): void {
      this.isProgressing = true;
    },

    handleSaveSuceeded(reservationId: string): void {
      const toastConfig: BNoticeConfig = {
        message: "予約しました",
        type: "is-success"
      };

      this.isProgressing = false;
      this.$buefy.toast.open(toastConfig);
      this._sendEmail(reservationId);
      this.$router.push({ name: "reserved-message", params: { id: reservationId } });
    },

    handleSaveFailure(error: any): void {
      let message = "予約することができませんでした";
      if (error.message) {
        message = error.message;
      }

      const toastConfig: BNoticeConfig = {
        message: message,
        type: "is-danger"
      };

      this.isProgressing = false;
      this.$buefy.toast.open(toastConfig);
    },

    handleValidationFailure(): void {
      const toastConfig: BNoticeConfig = {
        message: "入力内容に誤りがあります。エラーメッセージを確認してください。",
        type: "is-danger"
      };

      this.isProgressing = false;
      this.$buefy.toast.open(toastConfig);
    },

    _sendEmail(id: string): void {
      const href = this.$router.resolve({
        name: "reservation-detail",
        params: {
          id: id
        }
      }).href;
      const redirectUrl = `${location.origin}${href}`;
      sendEmail(this.reservation, id, redirectUrl, EMAIL_MESSAGE_TEMPLATES.CREATED);
    }
  },
  data() {
    return {
      isProgressing: false
    };
  }
});
