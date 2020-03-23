import { ActionTree } from "vuex";

// entity
import { Reservation } from "@/entity/reservation";
import { ReservationSearchOption } from "@/entity/reservation-search-option";

// plugin
import firebase from "@/plugins/firebase";

// store
import { RootState } from "@/store";
import { ReservationState } from "@/store/reservation";
import {
  CANCEL,
  FETCH,
  FETCH_BY_ID,
  SAVE,
  SET_ITEM,
  SET_ITEMS
} from "@/store/constant";

// firestore collection name
const COLLECTION_NAME = "reservations";

const actions: ActionTree<ReservationState, RootState> = {
  /**
   * 予約一覧取得
   * @param options
   */
  [FETCH]: async ({ commit }, options: ReservationSearchOption) => {
    console.log(options);

    const collection = firebase.firestore().collection(COLLECTION_NAME);
    const items: Reservation[] = [];
    const $promise = collection.get().then(query => {
      query.forEach(doc => {
        const data = doc.data();
        const item: Reservation = {
          id: doc.id,
          reservation_date: data.reservation_date.toDate(),
          reservation_time: data.reservation_time,
          reserver_name: data.reserver_name,
          number_of_reservations: data.number_of_reservations,
          reservation_seats: [],
          tel: data.tel,
          mail: data.mail,
          comment: data.comment
        };

        items.push(item);
      });

      commit(SET_ITEMS, items);
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
        const reservation: Reservation = {
          id: id,
          reservation_date: data.reservation_date.toDate(),
          reservation_time: data.reservation_time,
          reserver_name: data.reserver_name,
          reservation_seats: [],
          number_of_reservations: data.number_of_reservations,
          tel: data.tel,
          mail: data.mail,
          comment: data.comment
        };
        commit(SET_ITEM, reservation);
      });

    return await collection.doc(id);
  },

  /**
   * 予約登録
   * @param reservation
   */
  [SAVE]: async ({ commit }, reservation: Reservation) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    const requestBody = {
      reservation_date: reservation.reservation_date,
      reservation_time: reservation.reservation_time,
      reserver_name: reservation.reserver_name,
      number_of_reservations: reservation.number_of_reservations,
      tel: reservation.tel,
      mail: reservation.mail,
      comment: reservation.comment
    };

    return await collection.add(requestBody);
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
