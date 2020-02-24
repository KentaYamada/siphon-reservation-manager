import { ActionTree } from "vuex";
import { Reservation } from "@/entity/reservation";
import { RootState } from "@/store";
import { ReservationState } from "@/store/reservation";
import { FETCH, SET_ITEMS } from "@/store/constant";

const actions: ActionTree<ReservationState, RootState> = {
  /**
   * 予約一覧取得
   */
  [FETCH]: ({ commit }) => {
    /*const reservations: Reservation[] = [
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
        reservation_date: "2020-02-01 11:00 - 12:00",
        reservation_time: "11:00 - 12:00",
        reserver_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      }
    ];*/
    const reservations: Reservation[] = [];
    commit(SET_ITEMS, reservations);
  }
};

export default actions;
