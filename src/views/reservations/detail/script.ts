import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { DialogConfig, ToastConfig } from "buefy/types/components";

// component
import ReservationDetailContent from "@/components/reservations/detail/ReservationDetailContent.vue";

// entity
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";

// store
import { CANCEL, FETCH_BY_ID, VISIBLE_ACTIONS } from "@/store/constant";

// utility
import { sendEmail } from "@/utility/email-utility";

export default Vue.extend({
  components: {
    ReservationDetailContent
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState("reservation", ["reservation"]),
    ...mapGetters("reservation", [VISIBLE_ACTIONS])
  },
  methods: {
    ...mapActions("reservation", [CANCEL, FETCH_BY_ID]),

    /**
     * 予約取消
     */
    confirmCancel(): void {
      const message = `
        <p>予約を取り消しますか？</p>
        <small>※取り消した後の予約はもとに戻せません。</small>
      `;
      const config: DialogConfig = {
        type: "is-danger",
        message: message,
        confirmText: "取り消し",
        cancelText: "閉じる",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle",
        onConfirm: () => {
          this.cancel(this.id)
            .then(() => {
              this._sendEmail(this.id);

              const toastConfig: ToastConfig = {
                message: "予約を取り消しました",
                type: "is-danger"
              };
              this.$buefy.toast.open(toastConfig);
              this.$router.push({
                name: "reservation-canceled-message"
              });
            })
            .catch(error => {
              console.error(error);

              const message = `
                <p>予約の取り消しに失敗しました</p>
                <p>お手数ですが、時間をおいて再度実行してください</p>
              `;
              const toastConfig: ToastConfig = {
                message: message,
                type: "is-danger"
              };
              this.$buefy.toast.open(toastConfig);
            });
        }
      };

      this.$buefy.dialog.confirm(config);
    },

    /**
     * 予約変更
     */
    onClickEdit(): void {
      this.$router.push({
        name: "reservation-edit",
        params: { id: this.id }
      });
    },

    /**
     * 予約キャンセル完了通知メール送信
     * @param id
     */
    _sendEmail(id: string): void {
      const href = this.$router.resolve({
        path: "/"
      }).href;
      const redirectUrl = `${location.origin}${href}`;
      sendEmail(this.reservation, id, redirectUrl, EMAIL_MESSAGE_TEMPLATES.CANCELED);
    }
  },
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    this.fetchById(this.id)
      .catch(() => {
        const toastConfig: ToastConfig = {
          message: "予約情報の取得に失敗しました。時間をおいてアクセスしてください。",
          type: "is-danger"
        };
        this.$buefy.toast.open(toastConfig);
        this.$router.push({ name: "notfound" });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
});
