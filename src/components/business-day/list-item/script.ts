import Vue, { PropType } from "vue";
import { BusinessDay } from "@/entity/business-day";

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
  }
});
