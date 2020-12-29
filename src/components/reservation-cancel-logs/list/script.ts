import Vue from "vue";
import ReservationCancelLogListItem from "@/components/reservation-cancel-logs/list-item/ReservationCancelLogListItem.vue";
import NoListItem from "@/components/no-list-item/NoListItem.vue";

export default Vue.extend({
  template: "<reservation-cancel-log-list/>",
  components: {
    ReservationCancelLogListItem,
    NoListItem
  },
  computed: {
    hasItem(): boolean {
      return true;
    }
  }
});
