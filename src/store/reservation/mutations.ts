import { MutationTree } from "vuex";

// entity
import { Reservation } from "@/entity/reservation";
import { Timezone } from "@/entity/timezone";

// store
import {
  INITIALIZE,
  SET_RESERVATION_DATE,
  SET_ITEM,
  SET_ITEMS,
  SET_RESERVATION_TIMEZONE
} from "@/store/constant";
import { ReservationState } from "@/store/reservation";

const mutations: MutationTree<ReservationState> = {
  /**
   * 予約データ初期化
   * @param state
   */
  [INITIALIZE]: (state: ReservationState): void => {
    state.reservation = {
      reservation_date: null,
      reservation_date_id: "",
      reservation_start_time: null,
      reservation_end_time: null,
      reservation_time_id: "",
      reservation_timezone_id: "",
      reserver_name: "",
      number_of_reservations: 0,
      tel: "",
      mail: "",
      comment: ""
    } as Reservation;
  },

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
  },

  /**
   * 予約日更新
   */
  [SET_RESERVATION_DATE]: (
    state: ReservationState,
    businessDay: Date
  ): void => {
    if (state.reservation) {
      state.reservation.reservation_date = businessDay;
    }
  },

  /**
   * 予約時間帯更新
   */
  [SET_RESERVATION_TIMEZONE]: (
    state: ReservationState,
    timezone: Timezone
  ): void => {
    if (state.reservation) {
      state.reservation.reservation_start_time = timezone.start_time;
      state.reservation.reservation_end_time = timezone.end_time;
    }
  }
};

export default mutations;
