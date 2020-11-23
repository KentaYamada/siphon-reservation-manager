import Vue, { PropType } from "vue";
import ReserverCard from "@/components/reserver/card/ReserverCard.vue";
import { ReservationByDate } from "@/entity/reservation-by-date";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";

export default Vue.extend({
  template: "<reservation-list-item/>",
  components: {
    ReserverCard
  },
  props: {
    reservationByDate: {
      required: true,
      type: Object as PropType<ReservationByDate>
    }
  },
  filters: {
    formatReservationDatetime
  },
  methods: {
    handleCancelSucceeded() {
      this.$emit("cancel-succeeded");
    },

    handleCancelFailed() {
      this.$emit("cancel-failed");
    }
  }
});
