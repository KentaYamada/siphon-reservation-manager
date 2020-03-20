import Vue, { PropType } from "vue";
import { DialogConfig, ModalConfig, ToastConfig } from "buefy/types/components";

// components
import TimezoneDialog from "@/components/timezones/dialog/TimezoneDialog.vue";

// entity
import { Timezone } from "@/entity/timezone";

export default Vue.extend({
  template: "<timezone-list-item>",
  props: {
    timezone: {
      required: true,
      type: Object as PropType<Timezone>
    }
  },
  methods: {
    /**
     * 予約時間帯設定
     */
    handleShowTimezoneDialog(): void {
      const config: ModalConfig = {
        parent: this,
        component: TimezoneDialog,
        hasModalCard: true,
        scroll: "keep",
        props: {
          timezone: this.timezone
        },
        events: {
          "save-success": () => {
            const toastConfig: ToastConfig = {
              message: "保存しました。",
              type: "is-success"
            };

            this.$buefy.toast.open(toastConfig);
            this.$emit("save-successed");
          }
        }
      };

      this.$buefy.modal.open(config);
    },
    /**
     * 予約時間帯削除
     */
    handleClicDelete(): void {
      const message = `
            <p>${this.timezone.text}を削除しますか？</p>
            <small>誤って削除した場合、再度データを登録してください。</small>`;
      const config: DialogConfig = {
        title: "予約時間帯削除",
        type: "is-danger",
        message: message,
        confirmText: "削除",
        cancelText: "キャンセル",
        hasIcon: true,
        iconPack: "fas",
        icon: "question-circle",
        onConfirm: () => {
          // this.deleteBusinessDay(this.businessDay);
        }
      };

      this.$buefy.dialog.confirm(config);
    }
  }
});
