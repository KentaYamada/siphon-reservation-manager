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
    const seatNo = this.reservationSeat.seat_no;
    return {
      seatPositionCss: `no${seatNo}`,
      seatNo: `seat-no${seatNo}`
    };
  },
  methods: {
    ...mapMutations("reservation", [SET_RESERVATION_SEAT]),

    /**
     * 予約座席更新イベント
     */
    onUpdateSeat(): void {
      console.log(this.reservationSeat);
      this.setReservationSeat(this.reservationSeat);
    }
  }
});
