import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { DialogConfig, ToastConfig } from "buefy/types/components";

// component
import ReservationDetailContent from "@/components/reservations/detail/ReservationDetailContent.vue";

// store
import { CANCEL, FETCH_BY_ID } from "@/store/constant";

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
        <p>予約を取消しますか？</p>
        <small>取消後の予約は、再度予約登録してください。</small>
      `;
      const config: DialogConfig = {
        type: "is-danger",
        title: "予約取消",
        message: message,
        confirmText: "取消",
        cancelText: "キャンセル",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle",
        onConfirm: () => {
          this.cancel(this.id)
            .then(() => {
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
    }
  },
  mounted() {
    this.fetchById(this.id).catch(error => {
      console.error(error);
      this.$router.push({ name: "notfound" });
    });
  }
});
