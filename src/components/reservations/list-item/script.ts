import Vue, { PropType } from "vue";
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";
import ReserverCard from "@/components/reserver/card/ReserverCard.vue";
import { ReservationByDateTime } from "@/entity/reservation-by-datetime";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";

export default Vue.extend({
  template: "<reservation-list-item/>",
  components: {
    ReservationSeatList,
    ReserverCard
  },
  props: {
    reservation: {
      required: true,
      type: Object as PropType<ReservationByDateTime>
    }
  },
  filters: {
    formatReservationDatetime
  },
  methods: {
    handleCancel(id: string) {
      this.$emit("cancel", id);
    }
  }
});
