import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

// entity
import { BusinessDay } from "@/entity/business-day";

// store
import { SAVE_BUSINESS_DAY } from "@/store/constant";

export default Vue.extend({
  props: {
    businessDay: {
      required: true,
      type: Object as PropType<BusinessDay>
    }
  },
  validations: {
    businessDay: {
      business_date: {
        required
      }
    }
  },
  methods: {
    ...mapActions("shop", [SAVE_BUSINESS_DAY]),

    /**
     * 営業日保存
     */
    handleClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveBusinessDay(this.businessDay);

        // todo: when firestore save succeeded
        this.$emit("close");
        this.$emit("save-success", "保存しました。");
      }
    }
  }
});
