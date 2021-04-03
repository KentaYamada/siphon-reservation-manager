import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { BDialogConfig, BNoticeConfig } from "buefy/types/components";
import ReservationDetailContent from "@/components/reservations/detail/ReservationDetailContent.vue";
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";
import { CANCEL, VISIBLE_ACTIONS } from "@/store/constant";
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
    ...mapActions("reservation", [CANCEL]),

    handleConfirmCancel(): void {
      const message = `
        <p>予約を取り消しますか？</p>
        <small>※取り消した後の予約はもとに戻せません。</small>
      `;
      const config: BDialogConfig = {
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
              const toastConfig: BNoticeConfig = {
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
              const toastConfig: BNoticeConfig = {
                message: message,
                type: "is-danger"
              };
              this.$buefy.toast.open(toastConfig);
            });
        }
      };

      this.$buefy.dialog.confirm(config);
    },

    handleClickEdit(): void {
      this.$router.push({
        name: "reservation-edit",
        params: { id: this.id }
      });
    },

    handleLoadStart(): void {
      this.isLoading = true;
    },

    handleLoadSucceeded(): void {
      this.isLoading = false;
    },

    handleLoadFailure(): void {
      this.isLoading = false;
      const toastConfig: BNoticeConfig = {
        message: "予約情報の取得に失敗しました。時間をおいてアクセスしてください。",
        type: "is-danger"
      };
      this.$buefy.toast.open(toastConfig);
      this.$router.push({ name: "notfound" });
    }
  },
  data() {
    return {
      isLoading: true
    };
  }
});
