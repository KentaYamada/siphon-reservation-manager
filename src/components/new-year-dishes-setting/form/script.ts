import Vue from "vue";
import { required, minValue } from "vuelidate/lib/validators";
import moment from "moment";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";

export default Vue.extend({
  template: "<new-year-dishes-setting-form/>",
  validations: {
    newYearDishesSetting: {
      start_date: {
        required
      },
      end_date: {
        required
      },
      receptions: {
        required,
        minValue: minValue(1)
      }
    }
  },
  methods: {
    handleSave() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.$emit("validation-failed");
      } else {
        this.isSaving = true;
      }
    }
  },
  data() {
    const today = moment()
      .set({
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      })
      .toDate();
    const newYearDishesSetting: NewYearDishesSetting = {
      id: "1",
      start_date: today,
      end_date: today,
      receptions: 0,
      is_pause: false,
      image: null
    };

    return {
      isSaving: false,
      isLoading: false,
      minDate: today,
      newYearDishesSetting: newYearDishesSetting
    };
  }
});
