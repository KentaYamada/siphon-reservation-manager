import Vue from "vue";
import { RESERVATION_DETAIL_URL } from "@/router/url";

export default Vue.extend({
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    const redirectUrl = `${RESERVATION_DETAIL_URL}/${this.id}`;
    return {
      redirectUrl: redirectUrl
    };
  }
});
