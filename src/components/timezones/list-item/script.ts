import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { BDialogConfig, BModalConfig } from "buefy/types/components";
import _ from "lodash";

// components
import TimezoneDialog from "@/components/timezones/dialog/TimezoneDialog.vue";

// entity
import { Timezone } from "@/entity/timezone";

// filter
import { timePeriod } from "@/filters/time-period";

// store
import { DELETE } from "@/store/constant";

export default Vue.extend({
  template: "<timezone-list-item/>",
  props: {
    timezone: {
      required: true,
      type: Object as PropType<Timezone>
    }
  },
  methods: {
    ...mapActions("timezone", [DELETE]),

    /**
     * 予約時間帯設定
     */
    handleShowTimezoneDialog(): void {
      const model = _.clone(this.timezone);
      const config: BModalConfig = {
        parent: this,
        component: TimezoneDialog,
        hasModalCard: true,
        scroll: "keep",
        props: {
          timezone: model
        },
        events: {
          "save-success": () => {
            this.$emit("edit-succeeded");
          }
        }
      };

      this.$buefy.modal.open(config);
    },
    /**
     * 予約時間帯削除
     */
    handleClicDelete(): void {
      const period = timePeriod(this.timezone.start_time, this.timezone.end_time);
      const message = `
            <p>「${period}」を削除しますか？</p>
            <small>誤って削除した場合、再度データを登録してください。</small>`;
      const config: BDialogConfig = {
        title: "予約時間帯削除",
        type: "is-danger",
        message: message,
        confirmText: "削除",
        cancelText: "キャンセル",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle",
        onConfirm: () => {
          this.delete(this.timezone.id)
            .then(() => {
              this.$emit("delete-succeeded");
            })
            .catch(error => {
              // todo: error handling
            });
        }
      };

      this.$buefy.dialog.confirm(config);
    }
  },
  filters: {
    timePeriod
  }
});
