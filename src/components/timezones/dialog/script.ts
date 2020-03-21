import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

// entity
import { Timezone } from "@/entity/timezone";

// store
import { SAVE } from "@/store/constant";

export default Vue.extend({
  props: {
    timezone: {
      required: true,
      type: Object as PropType<Timezone>
    }
  },
  validations: {
    timezone: {
      start_time: {
        required
      },
      end_time: {
        required
      }
    }
  },
  methods: {
    ...mapActions("timezone", [SAVE]),

    /**
     * 予約時間帯保存
     */
    handleClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isSaving = true;
        this.save(this.timezone)
          .then(() => {
            this.$emit("close");
            this.$emit("save-success");
          })
          .catch(() => {
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
