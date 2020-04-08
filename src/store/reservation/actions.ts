import { ActionTree } from "vuex";

// entity
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";

// plugin
import _ from "lodash";
import firebase from "@/plugins/firebase";

// store
import { RootState } from "@/store";
import { ReservationState } from "@/store/reservation";
import {
  CANCEL,
  FETCH,
  FETCH_BY_ID,
  FETCH_RESERVATION_SEATS,
  SAVE,
  SET_ITEM,
  SET_ITEMS,
  SET_RESERVATION_SEATS
} from "@/store/constant";

// firestore collection name
const COLLECTION_NAME = "reservations";
const RESERVATION_SEATS_COLLECTION = "reservation_seats";

const actions: ActionTree<ReservationState, RootState> = {
  /**
   * 予約一覧取得
   * @param options
   */
  [FETCH]: async ({ commit }, options: ReservationSearchOption) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    const $promise = collection.get().then(query => {
      let items: Reservation[] = [];

      query.forEach(doc => {
        const data = doc.data();
        const item: Reservation = {
          id: doc.id,
          reservation_date: data.reservation_date.toDate(),
          reservation_date_id: data.reservation_date_id,
          reservation_start_time: data.reservation_start_time.toDate(),
          reservation_end_time: data.reservation_end_time.toDate(),
          reservation_time_id: data.reservation_time_id,
          reserver_name: data.reserver_name,
          reservation_seats: [],
          number_of_reservations: data.number_of_reservations,
          tel: data.tel,
          mail: data.mail,
          comment: data.comment
        };

        items.push(item);
      });

      if (options.reservation_date_id) {
        // 予約日
        items = _.filter(items, (item: Reservation) => {
          return item.reservation_date_id === options.reservation_date_id;
        });
      }

      if (options.reservation_time_id) {
        // 予約時間
        items = _.filter(items, (item: Reservation) => {
          return item.reservation_time_id === options.reservation_time_id;
        });
      }

      // sort
      items = _.orderBy(
        items,
        ["reservation_date_id", "reservation_timezone_id"],
        ["desc", "asc"]
      );

      commit(SET_ITEMS, items);
    });

    return await $promise;
  },

  [FETCH_RESERVATION_SEATS]: async (
    { commit },
    options: ReservationSeatSearchOption
  ) => {
    const collection = firebase
      .firestore()
      .collection(RESERVATION_SEATS_COLLECTION);
    const $promise = collection.get().then(query => {
      let items: ReservationSeat[] = [];

      query.forEach(doc => {
        const data = doc.data();
        const item: ReservationSeat = {
          id: doc.id,
          seat_no: data.seat_no,
          is_reserved: true,
          is_selected: false,
          reservation_id: data.reservation_id,
          reservation_date: data.reservation_date.toDate(),
          reservation_date_id: data.reservation_date_id,
          reservation_start_time: data.reservation_start_time.toDate(),
          reservation_end_time: data.reservation_end_time.toDate(),
          reservation_time_id: data.reservation_time_id
        };

        items.push(item);

        if (options.reservation_id) {
          items = _.filter(items, (item: ReservationSeat) => {
            return item.reservation_id === options.reservation_id;
          });
        }

        if (options.reservation_date_id) {
          items = _.filter(items, (item: ReservationSeat) => {
            return item.reservation_date_id === options.reservation_date_id;
          });
        }

        if (options.reservation_time_id) {
          items = _.filter(items, (item: ReservationSeat) => {
            return item.reservation_time_id === options.reservation_time_id;
          });
        }

        items = _.orderBy(items, ["seat_no"], ["asc"]);

        commit(SET_RESERVATION_SEATS, items);
      });
    });

    return await $promise;
  },

  /**
   * 予約情報取得
   * @param id
   */
  [FETCH_BY_ID]: async ({ commit }, id: string) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    collection
      .doc(id)
      .get()
      .then(doc => {
        const data = doc.data();

        if (data) {
          const reservation: Reservation = {
            id: id,
            reservation_date: data.reservation_date.toDate(),
            reservation_date_id: data.reservation_date_id,
            reservation_start_time: data.reservation_start_time.toDate(),
            reservation_end_time: data.reservation_end_time.toDate(),
            reservation_time_id: data.reservation_time_id,
            reserver_name: data.reserver_name,
            reservation_seats: [],
            number_of_reservations: data.number_of_reservations,
            tel: data.tel,
            mail: data.mail,
            comment: data.comment
          };

          commit(SET_ITEM, reservation);
        }
      });

    return await collection.doc(id);
  },

  /**
   * 予約登録
   * @param reservation
   */
  [SAVE]: async ({ commit }, reservation: Reservation) => {
    console.log(reservation);

    let promise$ = null;
    const collection = firebase.firestore().collection(COLLECTION_NAME);

    if (reservation.id) {
      promise$ = collection.doc(reservation.id).set(reservation);
    } else {
      promise$ = collection.add(reservation);
    }

    return await promise$;
  },

  /**
   * 予約取消
   * @param id
   */
  [CANCEL]: async ({ commit }, id: string) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    return await collection.doc(id).delete();
  }
};

export default actions;
