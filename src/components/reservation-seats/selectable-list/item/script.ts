import Vue, { PropType } from "vue";
import { mapMutations } from "vuex";
import { ReservationSeat } from "@/entity/reservation-seat";
import { SET_ITEM } from "@/store/constant";

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
    ...mapMutations("reservationSeat", [SET_ITEM]),

    /**
     * 予約座席更新イベント
     */
    onUpdateSeat(): void {
      this.setItem(this.reservationSeat);
    }
  }
});
