import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { DialogConfig, ToastConfig } from "buefy/types/components";
import { FETCH_BY_ID } from "@/store/constant";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";

export default Vue.extend({
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState("reservation", ["reservation"])
  },
  methods: {
    ...mapActions("reservation", [FETCH_BY_ID]),

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
        // iconPack: 'fas',
        icon: "fa-question-circle",
        onConfirm: () => {
          console.log("hoge");
        }
      };

      this.$buefy.dialog.confirm(config);
    },

    /**
     * 予約変更
     */
    onClickEdit(): void {
      console.log("redirect to edit view");
    }
  },
  filters: {
    formatReservationDatetime
  },
  mounted() {
    this.fetchById(this.id);
  }
});
