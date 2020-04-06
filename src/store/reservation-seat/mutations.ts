import { MutationTree } from "vuex";

// entity
import { ReservationSeat } from "@/entity/reservation-seat";

// plugin
import _ from "lodash";

// store
import { ReservationSeatState } from "@/store/reservation-seat";
import { INITIALIZE, SET_ITEM, SET_ITEMS } from "@/store/constant";

const mutations: MutationTree<ReservationSeatState> = {
  [INITIALIZE]: (state: ReservationSeatState): void => {
    const seatNo = [1, 2, 3, 4, 5];
    const items: ReservationSeat[] = [];

    _.each(seatNo, (no: number) => {
      const item: ReservationSeat = {
        seat_no: no,
        is_reserved: false,
        is_selected: false,
        reservation_id: "",
        reservation_date: null,
        reservation_date_id: "",
        reservation_start_time: null,
        reservation_end_time: null,
        reservation_time_id: ""
      };

      items.push(item);
    });

    state.reservationSeats = items;
  },
  [SET_ITEM]: (state: ReservationSeatState, item: ReservationSeat): void => {
    _.each(state.reservationSeats, (seat: ReservationSeat) => {
      if (seat.seat_no === item.seat_no) {
        seat.id = item.id;
        seat.is_reserved = item.is_reserved;
        seat.is_selected = item.is_selected;
        seat.reservation_id = item.reservation_id;
        seat.reservation_date = item.reservation_date;
        seat.reservation_date_id = item.reservation_date_id;
        seat.reservation_start_time = item.reservation_start_time;
        seat.reservation_end_time = item.reservation_end_time;
        seat.reservation_time_id = item.reservation_time_id;
      }
    });
  },
  [SET_ITEMS]: (
    state: ReservationSeatState,
    items: ReservationSeat[]
  ): void => {
    state.reservationSeats = items;
  }
};

export default mutations;
