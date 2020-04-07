import { ActionTree } from "vuex";

// entity
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";

// plugin
import _ from "lodash";
import firebase from "@/plugins/firebase";

// store
import { RootState } from "@/store";
import { ReservationSeatState } from "@/store/reservation-seat";
import { FETCH, SET_ITEM } from "@/store/constant";

// firestore collection name
const COLLECTION_NAME = "reservation_seats";

const actions: ActionTree<ReservationSeatState, RootState> = {
  /**
   * 座席一覧取得
   * @param reservationId
   */
  [FETCH]: async ({ commit }, options: ReservationSeatSearchOption) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    const $promise = collection.get().then(query => {
      let items: ReservationSeat[] = [];

      query.forEach(doc => {
        const data = doc.data();
        const item: ReservationSeat = {
          id: doc.id,
          seat_no: data.seat_no,
          is_reserved: true,
          is_selected: true,
          reservation_id: data.reservation_id,
          reservation_date: data.reservation_date.toDate(),
          reservation_date_id: data.reservation_date_id,
          reservation_start_time: data.reservation_start_time.toDate(),
          reservation_end_time: data.reservation_end_time.toDate(),
          reservation_time_id: data.reservation_time_id
        };

        items.push(item);
      });

      if (items.length > 0) {
        if (options.reservation_date_id) {
          items = _.filter(items, (item: ReservationSeat) => {
            return item.reservation_date_id === options.reservation_date_id;
          });
        }

        if (options.reservation_time_id) {
          items = _.filter(items, (item: ReservationSeat) => {
            return item.reservation_date_id === options.reservation_date_id;
          });
        }

        items = _.orderBy(items, ["seat_no"], ["asc"]);

        _.each(items, (item: ReservationSeat) => {
          commit(SET_ITEM, item);
        });
      }
    });

    return await $promise;
  }
};

export default actions;
