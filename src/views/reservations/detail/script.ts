import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { DialogConfig } from "buefy/types/components";

// store
import { CANCEL, FETCH_BY_ID } from "@/store/constant";

// component
import ReservationDetailContent from "@/components/reservations/detail/ReservationDetailContent.vue";

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
          this.cancel(this.id);
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
