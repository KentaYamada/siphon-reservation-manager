import Vue from "vue";
import SnsLinks from "@/components/sns-links/SnsLinks.vue";
import { NEW_YEAR_DISHES_RESERVATION_DETAIL_URL } from "@/router/url";

export default Vue.extend({
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    SnsLinks
  },
  methods: {
    handleRedirectToDetailView() {
      this.$router.push({
        name: "new-year-dishes-reservation-detail",
        params: {
          id: this.id
        }
      });
    }
  }
});
