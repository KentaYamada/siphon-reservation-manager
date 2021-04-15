import Vue, { PropType } from "vue";
import { ReservationByDateTime } from "@/entity/reservation-by-datetime";
import ReservationListItem from "@/components/reservations/list-item/ReservationListItem.vue";

export default Vue.extend({
  name: "reservation-list",
  components: {
    ReservationListItem
  },
  props: {
    hasItems: {
      required: true,
      type: Boolean
    },
    reservationList: {
      required: true,
      type: Array as PropType<Array<ReservationByDateTime>>
    }
  },
  methods: {
    handleCancel(id: string): void {
      this.$emit("cancel", id);
    }
  },
  template: "<reservation-list/>"
});
