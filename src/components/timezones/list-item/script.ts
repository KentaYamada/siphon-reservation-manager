import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { DialogConfig, ModalConfig } from "buefy/types/components";
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
      const config: ModalConfig = {
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
            <p><strong>予約時間: ${period}</strong>を削除しますか？</p>
            <small>誤って削除した場合、再度登録してください。</small>`;
      const config: DialogConfig = {
        type: "is-danger",
        message: message,
        confirmText: "はい",
        cancelText: "いいえ",
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
