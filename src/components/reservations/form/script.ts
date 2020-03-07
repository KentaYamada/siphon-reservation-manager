import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { FETCH, GET_RESERVABLE_PEOPLE } from "@/store/constant";
import { Reservation } from "@/entity/reservation";
import SelectableReservationSeatList from "@/components/reservation-seats/selectable-list/SelectableReservationSeatList.vue";

export default Vue.extend({
  template: "<reservation-form/>",
  components: {
    SelectableReservationSeatList
  },
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    }
  },
  computed: {
    ...mapState("timezone", ["timezones"]),
    ...mapGetters("reservation", [GET_RESERVABLE_PEOPLE])
  },
  methods: {
    ...mapActions("timezone", [FETCH])
  },
  mounted() {
    this.fetch();
  }
});
