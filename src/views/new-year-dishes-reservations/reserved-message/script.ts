import Vue from "vue";
import { NEW_YEAR_DISHES_RESERVATION_DETAIL_URL } from "@/router/url";

export default Vue.extend({
  props: {
    id: {
      required: true,
      type: String
    }
  },
  methods: {
    handleRedirectToDetailView() {
      console.log(this.id);
      this.$router.push({
        name: "new-year-dishes-reservation-detail",
        params: {
          id: this.id
        }
      });
    }
  }
});
