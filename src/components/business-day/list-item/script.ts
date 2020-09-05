import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { BDialogConfig, BModalConfig } from "buefy/types/components";
import BusinessDayDialog from "@/components/business-day/dialog/BusinessDayDialog.vue";
import { BusinessDay } from "@/entity/business-day";
import { formatDateJp } from "@/filters/format-date-jp";
import { DELETE } from "@/store/constant";

export default Vue.extend({
  template: "<business-day-list-item/>",
  props: {
    businessDay: {
      required: true,
      type: Object as PropType<BusinessDay>
    }
  },
  methods: {
    ...mapActions("businessDay", [DELETE]),

    handleShowBusinessDayDialog(): void {
      const config: BModalConfig = {
        parent: this,
        component: BusinessDayDialog,
        hasModalCard: true,
        props: {
          id: this.businessDay.id
        },
        events: {
          "load-business-day-failed": () => {
            this.$emit("load-business-day-failed");
          },
          "save-succeeded": () => {
            this.$emit("save-succeeded");
          },
          "save-failed": () => {
            this.$emit("save-failed");
          },
          "sync-selectable-timezones-failed": () => {
            this.$emit("sync-selectable-timezones-failed");
          },
          "validation-failed": () => {
            this.$emit("validation-failed");
          }
        }
      };
      this.$buefy.modal.open(config);
    },

    handleClicDelete(): void {
      const businessDay = formatDateJp(this.businessDay.business_date);
      const message = `
        <p><strong>営業日: ${businessDay}</strong>を削除しますか？</p>
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
          this.delete(this.businessDay.id)
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
    formatDateJp
  }
});
