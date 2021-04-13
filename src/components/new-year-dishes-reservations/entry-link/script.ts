import Vue from "vue";
import moment from "moment";
import { forkJoin } from "rxjs";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";
import { NewYearDishesSettingService } from "@/services/firestore/new-year-dishes-setting-service";

/**
 * New year dishes reservation entry link component
 */
export default Vue.extend({
  name: "new-year-dishes-reservation-entry-link",
  computed: {
    isAccessible(): boolean {
      if (this.setting.is_pause) {
        return false;
      }

      if (moment(this.setting.end_datetime).diff(new Date()) <= 0) {
        return false;
      }

      if (this.setting.receptions <= this.receptions) {
        return false;
      }

      return true;
    }
  },
  data() {
    return {
      setting: {} as NewYearDishesSetting,
      receptions: 0
    };
  },
  mounted() {
    forkJoin([NewYearDishesReservationService.fetchReceptions(), NewYearDishesSettingService.fetch()]).subscribe(
      values => {
        this.receptions = values[0];
        this.setting = values[1];
      }
    );
  },
  template: "<new-year-dishes-reservation-entry-link/>"
});
