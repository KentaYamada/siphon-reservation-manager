import { MutationTree } from "vuex";
import { chain, times } from "lodash";
import { Reservation } from "@/entity/reservation";
import { ReservationByDateTime } from "@/entity/reservation-by-datetime";
import { ReservationSeat } from "@/entity/reservation-seat";
import { SET_ITEMS, UPDATE_RESERVATION_DATE, UPDATE_RESERVATION_TIME } from "@/store/constant";
import { ReservationByDateTimeState } from "@/store/reservation-by-datetime";

const mutations: MutationTree<ReservationByDateTimeState> = {
  [SET_ITEMS]: (state: ReservationByDateTimeState, payload: Array<Reservation>): void => {
    const items: Array<ReservationByDateTime> = chain(payload)
      .groupBy(value => value.reservation_start_time)
      .map(value => {
        const seats: Array<ReservationSeat> = times(4, i => {
          return {
            is_reserved: false,
            is_selected: false,
            reservation_date_id: value[0].reservation_date_id,
            reservation_time_id: value[0].reservation_time_id,
            seat_no: i + 1
          } as ReservationSeat;
        });

        seats.forEach(seat => {
          value.forEach(v => {
            const reservedSeat = v.reservation_seats.find(s => {
              return seat.seat_no === s.seat_no && (s.is_reserved || s.is_selected)
            });

            if (reservedSeat) {
              seat.is_reserved = true;
            }
          });
        });

        const data: ReservationByDateTime = {
          reservation_date: value[0].reservation_date as Date,
          reservation_date_id: value[0].reservation_date_id,
          reservation_start_time: value[0].reservation_start_time as Date,
          reservation_end_time: value[0].reservation_end_time as Date,
          reservation_time_id: value[0].reservation_time_id,
          reservations: value,
          seats: seats
        };

        return data;
      })
      .orderBy(["reservation_date", "reservation_start_time"], ["asc", "asc"])
      .value();

    state.reservations = items;
  },

  [UPDATE_RESERVATION_DATE]: (state: ReservationByDateTimeState, payload: string): void => {
    state.searchOption.reservation_date_id = payload;
    state.searchOption.reservation_time_id = "";
  },

  [UPDATE_RESERVATION_TIME]: (state: ReservationByDateTimeState, payload: string): void => {
    state.searchOption.reservation_time_id = payload;
  }
};

export default mutations;
