import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { DialogConfig, ToastConfig } from "buefy/types/components";

// component
import ReservationDetailContent from "@/components/reservations/detail/ReservationDetailContent.vue";

// entity
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";

// store
import { CANCEL, FETCH_BY_ID } from "@/store/constant";

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
    ...mapState("reservation", ["reservation"])
  },
  methods: {
    ...mapActions("reservation", [CANCEL, FETCH_BY_ID]),

    /**
     * 予約取消
     */
    confirmCancel(): void {
      const message = `
        <p>予約をキャンセルしますか？</p>
        <small>※キャンセルした後の差し戻しはできません。</small>
      `;
      const config: DialogConfig = {
        type: "is-danger",
        title: "予約キャンセル",
        message: message,
        confirmText: "キャンセル",
        cancelText: "閉じる",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle",
        onConfirm: () => {
          this.cancel(this.id)
            .then(() => {
              this.__sendEmail(this.id);

              const toastConfig: ToastConfig = {
                message: "予約キャンセルしました",
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
                <p>予約のキャンセルに失敗しました</p>
                <p>お手数ですが、時間を置いて再度キャンセルを実行してください</p>
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
    __sendEmail(id: string): void {
      const href = this.$router.resolve({
        path: "/"
      }).href;
      const redirectUrl = `${location.origin}${href}`;
      sendEmail(
        this.reservation,
        id,
        redirectUrl,
        EMAIL_MESSAGE_TEMPLATES.CANCELED
      );
    }
  },
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    this.fetchById(this.id)
      .catch(error => {
        console.error(error);
        this.$router.push({ name: "notfound" });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
});
