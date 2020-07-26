import Vue, { PropType } from "vue";
import SelectableTimezoneListItem from "@/components/timezones/selectable-list-item/SelectableTimezoneListItem.vue";
import { SelectableTimezone } from "@/entity/selectable-timezone";

export default Vue.extend({
  template: "<selectable-timezone-list/>",
  components: {
    SelectableTimezoneListItem
  },
  props: {
    timezones: {
      required: true,
      type: Array as PropType<Array<SelectableTimezone>>
    }
  }
});
