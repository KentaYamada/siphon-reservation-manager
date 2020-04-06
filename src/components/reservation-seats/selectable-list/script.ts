import Vue, { PropType } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

// component
import SelectableReservationSeatListItem from "@/components/reservation-seats/selectable-list/item/SelectableReservationSeatListItem.vue";

// entity
import { ReservationSeat } from "@/entity/reservation-seat";

// store
import { FETCH, SET_RESERVATION_SEATS } from "@/store/constant";

export default Vue.extend({
  template: "<selectable-reservation-seat-list/>",
  props: {
    reservationSeats: {
      required: true,
      type: Array as PropType<ReservationSeat[]>
    }
  },
  components: {
    SelectableReservationSeatListItem
  }
});
