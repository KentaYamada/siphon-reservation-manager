import Vue from "vue";
import { required, minValue } from "vuelidate/lib/validators";
import moment from "moment";
import { Observable } from "rxjs";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { NewYearDishesSettingService } from "@/services/firestore/new-year-dishes-setting-service";

export default Vue.extend({
  template: "<new-year-dishes-setting-form/>",
  validations: {
    newYearDishesSetting: {
      start_datetime: {
        required
      },
      end_datetime: {
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
        NewYearDishesSettingService.save(this.newYearDishesSetting).subscribe(
          () => {
            this.$emit("save-succeeded");
          },
          () => {
            this.$emit("save-failed");
          },
          () => {
            this.isSaving = false;
          }
        );
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
      start_datetime: today,
      end_datetime: today,
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
