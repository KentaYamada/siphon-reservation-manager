import _ from "lodash";
import { MutationTree } from "vuex";
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationState } from "@/store/reservation";
import {
  INITIALIZE,
  SET_ITEM,
  SET_ITEMS,
  SET_RESERVATION_SEAT,
  SET_RESERVATION_SEATS
} from "@/store/constant";

const mutations: MutationTree<ReservationState> = {
  /**
   * 予約データ初期化
   * @param state
   */
  [INITIALIZE]: (state: ReservationState): void => {
    state.reservation = {
      id: null,
      reservation_date: "",
      reservation_time: "",
      reserver_name: "",
      reservation_seats: [
        {
          id: null,
          seat_no: 1,
          is_reserved: false
        },
        {
          id: null,
          seat_no: 2,
          is_reserved: false
        },
        {
          id: null,
          seat_no: 3,
          is_reserved: false
        },
        {
          id: null,
          seat_no: 4,
          is_reserved: false
        },
        {
          id: null,
          seat_no: 5,
          is_reserved: false
        }
      ],
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
   * 予約座席更新
   * @param state
   * @param reservationSeat
   */
  [SET_RESERVATION_SEAT]: (
    state: ReservationState,
    reservationSeat: ReservationSeat
  ): void => {
    _.forEach(state.reservation?.reservation_seats, (item: ReservationSeat) => {
      const updatable =
        item.seat_no === reservationSeat.seat_no && !item.is_reserved;

      if (updatable) {
        // 座席選択を更新して処理終了
        item.is_selected = reservationSeat.is_selected;
        return false;
      }
    });
  },

  /**
   * 予約座席更新
   * @param state
   * @param reservationSeats
   */
  [SET_RESERVATION_SEATS]: (
    state: ReservationState,
    reservationSeats: ReservationSeat[]
  ): void => {
    state.reservation.reservation_seats = reservationSeats;
  }
};

export default mutations;
