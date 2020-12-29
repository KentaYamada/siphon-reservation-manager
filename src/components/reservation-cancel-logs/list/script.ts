import Vue, { PropType } from "vue";
import NoListItem from "@/components/no-list-item/NoListItem.vue";
import ReservationCancelLogListItem from "@/components/reservation-cancel-logs/list-item/ReservationCancelLogListItem.vue";
import { ReservationCancelLog } from "@/entity/reservation-cancel-log";

export default Vue.extend({
  template: "<reservation-cancel-log-list/>",
  components: {
    NoListItem,
    ReservationCancelLogListItem
  },
  props: {
    items: {
      required: true,
      type: Array as PropType<Array<ReservationCancelLog>>
    }
  },
  computed: {
    noItem(): boolean {
      return this.items.length === 0;
    }
  }
});
