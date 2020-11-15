import Vue from "vue";
import moment from "moment";
import { required, minValue } from "vuelidate/lib/validators";
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
        this.$emit("update-progress", true);

        NewYearDishesSettingService.save(this.newYearDishesSetting).subscribe(
          () => this.$emit("save-succeeded"),
          () => this.$emit("save-failed"),
          () => this.$emit("update-progress", false)
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
    const newYearsEve = moment()
      .set({
        month: 11, // 0 origin
        date: 31,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      })
      .toDate();
    const newYearDishesSetting: NewYearDishesSetting = {
      start_datetime: today,
      end_datetime: today,
      delivery_date: newYearsEve,
      delivery_time_from: today,
      delivery_time_to: today,
      receptions: 0,
      max_quantity_per_reservation: 0,
      is_pause: false,
      image: null
    };

    return {
      minDate: today,
      newYearDishesSetting: newYearDishesSetting
    };
  },
  mounted() {
    this.$emit("update-progress", true);

    NewYearDishesSettingService.fetch().subscribe(
      (response: NewYearDishesSetting) => (this.newYearDishesSetting = response),
      () => this.$emit("load-failed"),
      () => this.$emit("update-progress", false)
    );
  }
});
