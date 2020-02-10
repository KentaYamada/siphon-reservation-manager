import Vue from "vue";
import { DialogConfig, ToastConfig } from "buefy/types/components";

export default Vue.extend({
  methods: {
    confirmCancel(): void {
      const message = `
        <p>予約を取消しますか？</p>
        <small>取消後の予約は、再度予約登録してください。</small>
      `;
      const config: DialogConfig = {
        type: 'is-danger',
        title: '予約取消',
        message: message,
        confirmText: '取消',
        cancelText: 'キャンセル',
        hasIcon: true,
        // iconPack: 'fas',
        icon: 'fa-question-circle',
        onConfirm: () => {
            console.log('hoge');
        },
      };

      this.$buefy.dialog.confirm(config);
    },
  },
});

