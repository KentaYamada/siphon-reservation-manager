import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { BDialogConfig, BModalConfig, BNoticeConfig } from "buefy/types/components";

// component
import BusinessDayForm from "@/components/business-day/dialog/BusinessDayForm.vue";

// entity
import { BusinessDay } from "@/entity/business-day";

// filter
import { formatDateJp } from "@/filters/format-date-jp";

// store
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

    /**
     * 営業日編集
     */
    handleClickEdit(): void {
      const config: BModalConfig = {
        parent: this,
        component: BusinessDayForm,
        hasModalCard: true,
        scroll: "keep",
        props: {
          businessDay: this.businessDay
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
     * 営業日削除
     */
    handleClicDelete(): void {
      const businessDay = formatDateJp(this.businessDay.business_date);
      const message = `
        <p>「${businessDay}」を削除しますか？</p>
        <small>誤って削除した場合、再度データを登録してください。</small>`;
      const config: BDialogConfig = {
        title: "営業日削除",
        type: "is-danger",
        message: message,
        confirmText: "削除",
        cancelText: "キャンセル",
        hasIcon: true,
        iconPack: "fas",
        icon: "exclamation-circle",
        onConfirm: () => {
          this.delete(this.businessDay.id)
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
    formatDateJp
  }
});
