import Vue from "vue";
import ReservationCancelLogSearchForm from "@/components/reservation-cancel-logs/search-form/ReservationCancelLogSearchForm.vue";

export default Vue.extend({
  components: {
    ReservationCancelLogSearchForm
  },
  data() {
    return {
      isLoading: false
    };
  }
});
