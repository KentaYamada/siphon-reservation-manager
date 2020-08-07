import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { BDialogConfig, BModalConfig } from "buefy/types/components";
import _ from "lodash";
import TimezoneDialog from "@/components/timezones/dialog/TimezoneDialog.vue";
import { Timezone } from "@/entity/timezone";
import { timePeriod } from "@/filters/time-period";
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

    handleShowTimezoneDialog(): void {
      const config: BModalConfig = {
        parent: this,
        component: TimezoneDialog,
        hasModalCard: true,
        props: {
          id: this.timezone.id
        },
        events: {
          "load-timezone-failed": () => {
            this.$emit("load-timezone-failed");
          },
          "save-succeeded": () => {
            this.$emit("save-succeeded");
          },
          "save-failed": () => {
            this.$emit("save-failed");
          },
          "validation-failed": () => {
            this.$emit("validation-failed");
          }
        }
      };
      this.$buefy.modal.open(config);
    },

    handleClicDelete(): void {
      const period = timePeriod(this.timezone.start_time, this.timezone.end_time);
      const message = `
            <p><strong>予約時間: ${period}</strong>を削除しますか？</p>
            <small>誤って削除した場合、再度登録してください。</small>`;
      const config: BDialogConfig = {
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
            .catch(() => {
              this.$emit("delete-failed");
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
