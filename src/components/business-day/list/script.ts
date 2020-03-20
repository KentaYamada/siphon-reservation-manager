import Vue, { PropType } from "vue";
import { mapGetters } from "vuex";

// component
import BusinessDayListItem from "@/components/business-day/list-item/BusinessDayListItem.vue";

// entity
import { BusinessDay } from "@/entity/business-day";

// store
import { HAS_BUSINESS_DAYS } from "@/store/constant";

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
  },
  computed: {
    ...mapGetters("shop", [HAS_BUSINESS_DAYS])
  }
});
