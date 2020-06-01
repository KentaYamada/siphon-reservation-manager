import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

// entity
import { BusinessDay } from "@/entity/business-day";

// store
import { SAVE } from "@/store/constant";

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
    ...mapActions("businessDay", [SAVE]),

    /**
     * 営業日保存
     */
    handleClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isSaving = true;
        this.save(this.businessDay)
          .then(() => {
            this.$emit("close");
            this.$emit("save-success");
          })
          .catch(error => {
            // todo: error handling
          })
          .finally(() => {
            this.isSaving = false;
          });
      }
    }
  },
  data() {
    return {
      isSaving: false
    };
  }
});
