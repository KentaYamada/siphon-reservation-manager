import Vue, { PropType } from "vue";
import { required } from "vuelidate/lib/validators";

// entity
import { Timezone } from "@/entity/timezone";

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
    handleClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // todo: when firestore save succeeded
        this.$emit("close");
        this.$emit("save-success", "保存しました。");
      }
    }
  }
});
