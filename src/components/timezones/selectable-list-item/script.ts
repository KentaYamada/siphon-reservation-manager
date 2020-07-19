import Vue, { PropType } from "vue";

// entity
import { SelectableTimezone } from "@/entity/selectable-timezone";

// filter
import { timePeriod } from "@/filters/time-period";

export default Vue.extend({
  template: "<selectable-timezone-list-item/>",
  props: {
    timezone: {
      // required: true,
      type: Object as PropType<SelectableTimezone>
    }
  },
  methods: {
    /**
     * チェックボックス変更イベント
     */
    // onChangeSelected(): void {
    // }
  },
  filters: {
    timePeriod
  }
});
