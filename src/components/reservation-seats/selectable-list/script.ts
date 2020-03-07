import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { FETCH } from "@/store/constant";
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
    ...mapActions("reservationSeat", [FETCH])
  },
  mounted() {
    this.fetch();
  }
});
