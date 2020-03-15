import Vue, { PropType } from "vue";

// component
import BusinessDayListItem from "@/components/business-day/list-item/BusinessDayListItem.vue";

// entity
import { BusinessDay } from "@/entity/business-day";

export default Vue.extend({
  template: "<business-day-list/>",
  components: {
    BusinessDayListItem
  },
  props: {
    businessDays: {
      required: true,
      type: Array as PropType<BusinessDay[]>
    }
  }
});
