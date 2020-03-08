import _ from "lodash";
import { GetterTree } from "vuex";
import { ReservationSeat } from "@/entity/reservation-seat";
import { RootState } from "@/store";
import { GET_RESERVABLE_PEOPLE, HAS_ITEMS } from "@/store/constant";
import {
  ReservationState,
  MAX_NUMBER_OF_RESERVATIONS
} from "@/store/reservation";

const getters: GetterTree<ReservationState, RootState> = {
  /**
   * 予約可能人数取得
   * @param state
   * @returns number
   */
  [GET_RESERVABLE_PEOPLE]: (state: ReservationState): number => {
    // 予約済・座席選択データ取得
    const seats = state.reservation?.reservation_seats;
    const reservedSeats = _.filter(seats, (seat: ReservationSeat) => {
      return seat.is_reserved;
    });
    const selectedSeats = _.filter(seats, (seat: ReservationSeat) => {
      return seat.is_selected;
    });

    // 1テーブル2名で計算
    const reservePeople = selectedSeats.length * 2;
    const reservedPeople = reservedSeats.length * 2;
    const total = reservedPeople + reservePeople;

    if (MAX_NUMBER_OF_RESERVATIONS <= reservedPeople) {
      return 0;
    }

    if (MAX_NUMBER_OF_RESERVATIONS <= total) {
      return 0;
    }

    return MAX_NUMBER_OF_RESERVATIONS - total;
  },

  /**
   * 予約データがあるかどうか
   * @param state
   * @returns boolean
   */
  [HAS_ITEMS]: (state: ReservationState): boolean => {
    return state.reservations.length > 0;
  }
};

export default getters;
