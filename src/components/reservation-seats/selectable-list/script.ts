import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { FETCH, SET_RESERVATION_SEATS } from "@/store/constant";
import SelectableReservationSeatListItem from "@/components/reservation-seats/selectable-list/item/SelectableReservationSeatListItem.vue";

export default Vue.extend({
  template: "<selectable-reservation-seat-list/>",
  components: {
    SelectableReservationSeatListItem
  },
  computed: {
    ...mapState("reservationSeat", ["reservationSeats"])
  },
  methods: {
    ...mapActions("reservationSeat", [FETCH]),
    ...mapMutations("reservation", [SET_RESERVATION_SEATS])
  },
  mounted() {
    // todo: set reservation seats if fetched
    this.fetch();
    this.setReservationSeats(this.reservationSeats);
  }
});
