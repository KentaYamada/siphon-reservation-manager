import { ActionTree } from "vuex";
import { ReservationSeat } from "@/entity/reservation-seat";
import { RootState } from "@/store";
import { ReservationSeatState } from "@/store/reservation-seat";
import { FETCH, SET_ITEMS } from "@/store/constant";

const actions: ActionTree<ReservationSeatState, RootState> = {
  /**
   * 座席一覧取得
   * @param reservationId
   */
  [FETCH]: ({ commit }, reservationId: number) => {
    // todo: fetch to firebase database
    const reservationSeats: ReservationSeat[] = [
      {
        id: 1,
        seat_no: 1,
        is_reserved: false,
        is_selected: false
      },
      {
        id: 2,
        seat_no: 2,
        is_reserved: true,
        is_selected: false
      },
      {
        id: 3,
        seat_no: 3,
        is_reserved: true,
        is_selected: false
      },
      {
        id: 4,
        seat_no: 4,
        is_reserved: false,
        is_selected: false
      },
      {
        id: 5,
        seat_no: 5,
        is_reserved: false,
        is_selected: false
      }
    ];
    commit(SET_ITEMS, reservationSeats);
  }
};

export default actions;
