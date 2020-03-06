import { MutationTree } from "vuex";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSeatState } from "@/store/reservation-seat";
import { SET_ITEMS } from "@/store/constant";

const mutations: MutationTree<ReservationSeatState> = {
  [SET_ITEMS]: (
    state: ReservationSeatState,
    items: ReservationSeat[]
  ): void => {
    state.reservationSeats = items;
  }
};

export default mutations;
