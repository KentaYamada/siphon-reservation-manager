import Vue, { PropType } from "vue";

// entity
import { Reservation } from "@/entity/reservation";

// filter
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import { formatReserver } from "@/filters/format-reserver";

// component
import ReservationListItem from "@/components/reservations/list-item/ReservationListItem.vue";

export default Vue.extend({
  template: "<reservation-list/>",
  components: {
    ReservationListItem
  },
  props: {
    reservations: {
      required: true,
      type: Array as PropType<Reservation[]>
    },
    hasItems: {
      required: true,
      type: Boolean
    }
  },
  filters: {
    formatReservationDatetime,
    formatReserver
  },
  methods: {
    handleDeleteSucceeded() {
      this.$emit("delete-succeeded");
    }
  }
});
