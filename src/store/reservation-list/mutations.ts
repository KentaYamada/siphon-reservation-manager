import { MutationTree } from "vuex";
import { chain } from "lodash";
import { Reservation } from "@/entity/reservation";
import { SET_ITEMS, UPDATE_RESERVATION_DATE, UPDATE_RESERVATION_TIME } from "@/store/constant";
import { ReservationListState } from "@/store/reservation-list";
import { ReservationList } from "@/entity/reservation-list";

const mutations: MutationTree<ReservationListState> = {
  [SET_ITEMS]: (state: ReservationListState, payload: Array<Reservation>): void => {
    const items: Array<ReservationList> = chain(payload)
      .groupBy(val => val.reservation_start_time)
      .map(val => {
        return {
          id: val[0].id as string,
          reservation_date: val[0].reservation_date as Date,
          reservation_date_id: val[0].reservation_date_id as string,
          reservation_start_time: val[0].reservation_start_time as Date,
          reservation_end_time: val[0].reservation_end_time as Date,
          reservation_time_id: val[0].reservation_time_id as string,
          seats: val
        } as ReservationList;
      })
      .value();

    state.reservationList = items;
  },

  [UPDATE_RESERVATION_DATE]: (state: ReservationListState, payload: string): void => {
    state.searchOption.reservation_date_id = payload;
    state.searchOption.reservation_time_id = "";
  },

  [UPDATE_RESERVATION_TIME]: (state: ReservationListState, payload: string): void => {
    state.searchOption.reservation_time_id = payload;
  }
};

export default mutations;
