import Vue, { PropType } from "vue";
import SelectableReservationSeatListItem from "@/components/reservation-seats/selectable-list-item/SelectableReservationSeatListItem.vue";
import { ReservationSeat } from "@/entity/reservation-seat";

export default Vue.extend({
  template: "<selectable-reservation-seat-list/>",
  components: {
    SelectableReservationSeatListItem
  },
  props: {
    seats: {
      required: true,
      type: Array as PropType<Array<ReservationSeat>>
    }
  },
  methods: {
    handleUpdateSeat(selected: boolean, no: number) {
      this.$emit("update-seat", selected, no);
    }
  }
});
