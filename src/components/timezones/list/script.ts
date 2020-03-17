import Vue, { PropType } from "vue";

// component
import TimezoneListItem from "@/components/timezones/list-item/TimezoneListItem.vue";

// entity
import { Timezone } from "@/entity/timezone";

export default Vue.extend({
  template: "<timezone-list>",
  components: {
    TimezoneListItem
  },
  props: {
    timezones: {
      required: true,
      type: Array as PropType<Timezone[]>
    }
  }
});
