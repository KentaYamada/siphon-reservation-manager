import { ActionTree } from "vuex";

// entity
import { BusinessDay } from "@/entity/business-day";

// plugin
import firebase from "@/plugins/firebase";
import moment from "moment";
import _ from "lodash";

// store
import { RootState } from "@/store";
import { DELETE, FETCH, SAVE, SET_ITEMS } from "@/store/constant";
import { BusinessDayState } from "@/store/business-day";

// firestore collection name
const COLLECTION_NAME = "business_days";

const actions: ActionTree<BusinessDayState, RootState> = {
  /**
   * 営業日一覧取得
   */
  [FETCH]: async ({ commit }) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    let items: BusinessDay[] = [];

    const $promise = collection.get().then(query => {
      query.forEach(doc => {
        const businessDate = doc.data().business_date.toDate();
        const item: BusinessDay = {
          id: doc.id,
          text: moment(businessDate).format("YYYY年MM月DD日"),
          business_date: businessDate
        };
        items.push(item);
      });

      items = _.orderBy(items, ["business_date"], ["asc"]);
      commit(SET_ITEMS, items);
    });

    return await $promise;
  },

  /**
   * 営業日保存
   * @param businessDay
   */
  [SAVE]: async ({ commit }, businessDay: BusinessDay) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    const requestBody = {
      business_date: businessDay.business_date
    };
    let $promise = null;

    if (businessDay.id) {
      $promise = collection.doc(businessDay.id).set(requestBody);
    } else {
      $promise = collection.add(requestBody);
    }

    return await $promise;
  },

  /**
   * 営業日削除
   * @param id
   */
  [DELETE]: async ({ commit }, id: string) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    return await collection.doc(id).delete();
  }
};

export default actions;
