import Vue, { PropType } from "vue";

// entity
import { BusinessDay } from "@/entity/business-day";

// filter
import { formatDateJp } from "@/filters/format-date-jp";

export default Vue.extend({
  template: "<business-day-list-item/>",
  props: {
    businessDay: {
      required: true,
      type: Object as PropType<BusinessDay>
    }
  },
  methods: {
    handleClickEdit(): void {
      console.log("edit");
    },
    handleClicDelete(): void {
      console.log("delete");
    }
  },
  filters: {
    formatDateJp
  }
});
