import { ActionTree } from "vuex";

// entity
import { Timezone } from "@/entity/timezone";

// plugin
import firebase from "@/plugins/firebase";
import moment from "moment";

// store
import { RootState } from "@/store";
import {
  DELETE,
  FETCH,
  FETCH_ALL_RESERVED_TIMEZONES,
  SAVE,
  SET_ITEMS
} from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

// firestore collection name
const COLLECTION_NAME = "timezones";

const actions: ActionTree<TimezoneState, RootState> = {
  /**
   * 予約時間帯取得
   */
  [FETCH]: async ({ commit }) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    const items: Timezone[] = [];

    // todo: sort
    const $promise = collection.get().then(query => {
      query.forEach(doc => {
        const data = doc.data();
        const startTime = moment(data.start_time.toDate()).format("HH:mm");
        const endTime = moment(data.end_time.toDate()).format("HH:mm");
        const item: Timezone = {
          id: doc.id,
          text: `${startTime} - ${endTime}`,
          start_time: data.start_time.toDate(),
          end_time: data.end_time.toDate()
        };

        items.push(item);
      });

      commit(SET_ITEMS, items);
    });

    return await $promise;
  },

  /**
   * 予約時間帯取得
   */
  [FETCH_ALL_RESERVED_TIMEZONES]: async ({ commit }) => {
    //todo: 貸切可能な時間を問い合わせ
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    const items: Timezone[] = [];

    // todo: sort
    const $promise = collection.get().then(query => {
      query.forEach(doc => {
        const data = doc.data();
        const startTime = moment(data.start_time.toDate()).format("HH:mm");
        const endTime = moment(data.end_time.toDate()).format("HH:mm");
        const item: Timezone = {
          id: doc.id,
          text: `${startTime} - ${endTime}`,
          start_time: data.start_time.toDate(),
          end_time: data.end_time.toDate()
        };

        items.push(item);
      });

      commit(SET_ITEMS, items);
    });

    return await $promise;
  },

  /**
   * 予約時間帯取得
   * @param timezone
   */
  [SAVE]: async ({ commit }, timezone: Timezone) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    const requestBody = {
      start_time: timezone.start_time,
      end_time: timezone.end_time
    };
    let $promise = null;

    if (timezone.id) {
      $promise = collection.doc(timezone.id).set(requestBody);
    } else {
      $promise = collection.add(requestBody);
    }

    return await $promise;
  },

  /**
   * 予約時間帯削除
   * @param id
   */
  [DELETE]: async ({ commit }, id: string) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    return await collection.doc(id).delete();
  }
};

export default actions;
