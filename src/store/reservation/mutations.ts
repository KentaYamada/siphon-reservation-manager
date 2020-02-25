import { MutationTree } from "vuex";
import { Reservation } from "@/entity/reservation";
import { ReservationState } from "@/store/reservation";
import { SET_ITEM, SET_ITEMS } from "@/store/constant";

const mutations: MutationTree<ReservationState> = {
  /**
   * 予約データセット
   * @param state
   * @param item
   */
  [SET_ITEM]: (state: ReservationState, item: Reservation): void => {
    state.reservation = item;
  },
  /**
   * 予約一覧データセット
   * @param state
   * @param items
   */
  [SET_ITEMS]: (state: ReservationState, items: Reservation[]): void => {
    state.reservations = items;
  }
};

export default mutations;
