import Vue, { PropType } from "vue";
import ReserverCard from "@/components/reserver/card/ReserverCard.vue";
import { ReservationList } from "@/entity/reservation-list";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";

export default Vue.extend({
  template: "<reservation-list-item/>",
  components: {
    ReserverCard
  },
  props: {
    reservation: {
      required: true,
      type: Object as PropType<ReservationList>
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
