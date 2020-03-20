import Vue, { PropType } from "vue";
import { mapGetters } from "vuex";

// component
import TimezoneListItem from "@/components/timezones/list-item/TimezoneListItem.vue";

// entity
import { Timezone } from "@/entity/timezone";

// store
import { HAS_TIMEZONES } from "@/store/constant";

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
  },
  computed: {
    ...mapGetters("shop", [HAS_TIMEZONES])
  }
});
