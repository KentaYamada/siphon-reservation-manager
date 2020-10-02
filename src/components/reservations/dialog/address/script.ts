import Vue, { PropType } from "vue";
import { Reserver } from "@/entity/reserver";

export default Vue.extend({
  props: {
    reserver: {
      required: true,
      type: Object as PropType<Reserver>
    }
  }
});
