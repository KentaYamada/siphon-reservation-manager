import moment from "moment";
import { GetterTree } from "vuex";
import { ReservationSeat } from "@/entity/reservation-seat";
import { RootState } from "@/store";
import {
  GET_RESERVABLE_PEOPLE,
  HAS_RESERVATION_DATETIME,
  HAS_ITEMS,
  IS_SELECTED_SEATS,
  IS_FULL_OF_RESERVATIONS,
  VISIBLE_ACTIONS
} from "@/store/constant";
import { MAX_NUMBER_OF_RESERVATIONS, ReservationState } from "@/store/reservation";

const getReservedSeats = (seats: Array<ReservationSeat>): Array<ReservationSeat> => {
  return seats.filter(s => s.is_reserved);
};

const getSelectedSeats = (seats: Array<ReservationSeat>): Array<ReservationSeat> => {
  return seats.filter(s => s.is_selected);
};

const getters: GetterTree<ReservationState, RootState> = {
  [GET_RESERVABLE_PEOPLE]: (state: ReservationState): number => {
    const reservedSeats = getReservedSeats(state.reservation.reservation_seats).length;
    const selectedSeats = getSelectedSeats(state.reservation.reservation_seats).length;
    const total = reservedSeats + selectedSeats;
    const maxSeats = MAX_NUMBER_OF_RESERVATIONS / 2;

    // 1テーブル2名席で計算
    if (maxSeats <= reservedSeats) {
      return 0;
    }

    if (maxSeats <= total) {
      return 0;
    }

    return (maxSeats - total) * 2;
  },

  [HAS_RESERVATION_DATETIME]: (state: ReservationState): boolean => {
    return state.reservation.reservation_date_id !== "" && state.reservation.reservation_time_id !== "";
  },

  [HAS_ITEMS]: (state: ReservationState): boolean => {
    return state.reservations.length > 0;
  },

  [IS_FULL_OF_RESERVATIONS]: (state: ReservationState): boolean => {
    return getReservedSeats(state.reservation.reservation_seats).length === MAX_NUMBER_OF_RESERVATIONS / 2;
  },

  [IS_SELECTED_SEATS]: (state: ReservationState): boolean => {
    return getSelectedSeats(state.reservation.reservation_seats).length > 0;
  },

  [VISIBLE_ACTIONS]: (state: ReservationState): boolean => {
    if (!state.reservation) {
      return false;
    }

    // 予約変更・キャンセルは予約日時-2日前まで
    const current = moment();
    const deadline = moment(state.reservation.reservation_date);
    deadline.set({ hour: 23, minutes: 59, second: 59, millisecond: 0 });
    deadline.subtract(2, "days");

    return deadline.diff(current) >= 0;
  }
};

export default getters;
