import Vue, { PropType } from "vue";
import { mapMutations } from "vuex";
import { ReservationSeat } from "@/entity/reservation-seat";
import { SET_RESERVATION_SEAT } from "@/store/constant";

export default Vue.extend({
  template: "<selectable-reservation-seat-list-item/>",
  props: {
    reservationSeat: {
      required: true,
      type: Object as PropType<ReservationSeat>
    }
  },
  data() {
    return {
      seatPositionCss: `no${this.reservationSeat.seat_no}`
    };
  },
  methods: {
    ...mapMutations("reservation", [SET_RESERVATION_SEAT]),

    /**
     * 予約座席更新イベント
     */
    onUpdateSeat(): void {
      this.setReservationSeat(this.reservationSeat);
    }
  }
});
