import Vue from "vue";
import { RESERVATION_DETAIL_URL } from "@/router/url";

export default Vue.extend({
  data() {
    // todo: get entried id
    const id = 1;

    return {
      redirectUrl: `${RESERVATION_DETAIL_URL}/${id}`
    };
  }
});
