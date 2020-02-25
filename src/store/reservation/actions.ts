import { ActionTree } from "vuex";
import { Reservation } from "@/entity/reservation";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { RootState } from "@/store";
import { ReservationState } from "@/store/reservation";
import { FETCH, FETCH_BY_ID, SET_ITEM, SET_ITEMS } from "@/store/constant";

const actions: ActionTree<ReservationState, RootState> = {
  /**
   * 予約一覧取得
   * @param options
   */
  [FETCH]: ({ commit }, options: ReservationSearchOption) => {
    console.log(options);
    const reservations: Reservation[] = [
      {
        id: 1,
        reservation_date: "2020-02-01",
        reservation_time: "11:00 - 12:00",
        reserver_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      },
      {
        id: 2,
        reservation_date: "2020-02-01",
        reservation_time: "11:00 - 12:00",
        reserver_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      },
      {
        id: 3,
        reservation_date: "2020-02-01",
        reservation_time: "11:00 - 12:00",
        reserver_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      },
      {
        id: 4,
        reservation_date: "2020-02-01",
        reservation_time: "11:00 - 12:00",
        reserver_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      },
      {
        id: 5,
        reservation_date: "2020-02-01",
        reservation_time: "11:00 - 12:00",
        reserver_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      }
    ];
    // const reservations: Reservation[] = [];
    commit(SET_ITEMS, reservations);
  },

  /**
   * 予約情報取得
   * @param id
   */
  [FETCH_BY_ID]: ({ commit }, id: number) => {
    const reservation: Reservation = {
      id: id,
      reservation_date: "2020-02-01",
      reservation_time: "11:00 - 12:00",
      reserver_name: "Test太郎",
      number_of_reservations: 3,
      tel: "080-1479-7082",
      mail: "test@email.com"
    };

    commit(SET_ITEM, reservation);
  }
};

export default actions;
