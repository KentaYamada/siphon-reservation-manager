import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { BDialogConfig, BNoticeConfig } from "buefy/types/components";
import ReservationDetailContent from "@/components/reservations/detail/ReservationDetailContent.vue";
import { CANCEL, FETCH_BY_ID, VISIBLE_ACTIONS } from "@/store/constant";

export default Vue.extend({
  name: "reservation-detail",
  components: {
    ReservationDetailContent
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapState("reservation", ["reservation"]),
    ...mapGetters("reservation", [VISIBLE_ACTIONS])
  },
  mounted() {
    this.isLoading = true;
    this.fetchById(this.id)
      .catch(() => {
        this.handleShowDangerToast("予約情報の取得に失敗しました。時間をおいてアクセスしてください。");
        this.$router.push({ name: "notfound" });
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions("reservation", {
      cancel: CANCEL,
      fetchById: FETCH_BY_ID
    }),

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
          this.isLoading = true;
          this.cancel(this.id)
            .then(() => {
              this.handleShowDangerToast("予約を取り消しました");
              this.$router.push({ name: "reservation-canceled-message" });
            })
            .catch(() => {
              const message = `
                <p>予約の取り消しに失敗しました</p>
                <p>お手数ですが、時間をおいて再度実行してください</p>
              `;
              this.handleShowDangerToast(message);
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      };

      this.$buefy.dialog.confirm(config);
    },

    handleClickEdit(): void {
      this.$router.push({ name: "reservation-edit", params: { id: this.id } });
    },

    handleShowDangerToast(message: string): void {
      const config: BNoticeConfig = {
        message: message,
        type: "is-danger"
      };

      this.$buefy.toast.open(config);
    }
  }
});
