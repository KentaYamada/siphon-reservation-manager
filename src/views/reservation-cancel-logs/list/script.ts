import Vue from "vue";
import ReservationCancelLogSearchForm from "@/components/reservation-cancel-logs/search-form/ReservationCancelLogSearchForm.vue";
import ReservationCancelLogList from "@/components/reservation-cancel-logs/list/ReservationCancelLogList.vue";

export default Vue.extend({
  components: {
    ReservationCancelLogSearchForm,
    ReservationCancelLogList
  },
  data() {
    return {
      isLoading: false
    };
  }
});
