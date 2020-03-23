import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import {
  FETCH,
  GET_RESERVABLE_PEOPLE,
  GET_RESERVABLE_TIMEZONES
} from "@/store/constant";
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
    },
    validations: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters("reservation", [GET_RESERVABLE_PEOPLE]),
    ...mapGetters("timezone", {
      timezones: GET_RESERVABLE_TIMEZONES
    })
  },
  methods: {
    ...mapActions("timezone", {
      fetchTimezones: FETCH
    })
  },
  mounted() {
    this.fetchTimezones();
  }
});
