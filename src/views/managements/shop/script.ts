import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { DialogConfig, ModalConfig, ToastConfig } from "buefy/types/components";

// component
import BusinessDayForm from "@/components/business-day/dialog/BusinessDayForm.vue";
import BusinessDayList from "@/components/business-day/list/BusinessDayList.vue";

// entity
import { BusinessDay } from "@/entity/business-day";
import { Timezone } from "@/entity/timezone";

// store
import { FETCH } from "@/store/constant";
import { ShopState } from "@/store/shop";

export default Vue.extend({
  components: {
    BusinessDayList
  },
  computed: {
    ...mapState("shop", ["businessDays", "timezones"])
  },
  data() {
    return {
      showMenuButton: false
    };
  },
  methods: {
    ...mapActions("shop", [FETCH]),

    /**
     * 営業日設定フォーム表示
     */
    handleShowBusinessDayForm(): void {
      const businessDay: BusinessDay = {
        business_date: new Date()
      };
      const config: ModalConfig = {
        parent: this,
        component: BusinessDayForm,
        hasModalCard: true,
        scroll: "keep",
        props: {
          businessDay: businessDay
        },
        events: {
          "save-success": () => {
            const toastConfig: ToastConfig = {
              message: "保存しました。",
              type: "is-success"
            };

            this.$buefy.toast.open(toastConfig);
          }
        }
      };

      this.$buefy.modal.open(config);
    },

    /**
     * 追加メニューボタンのトグル
     */
    toggleAddMenuButtons(): void {
      this.showMenuButton = !this.showMenuButton;
    }
  },
  mounted() {
    this.fetch();
  }
});