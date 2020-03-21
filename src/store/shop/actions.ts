import { ActionTree } from "vuex";

// entity
import { BusinessDay } from "@/entity/business-day";
import { Timezone } from "@/entity/timezone";

// plugin
import firebase from "@/plugins/firebase";

// store
import { RootState } from "@/store";
import { ShopState } from "@/store/shop";
import {
  DELETE_BUSINESS_DAY,
  FETCH,
  SAVE_BUSINESS_DAY,
  SET_BUSINESS_DAYS,
  SET_TIMEZONES
} from "@/store/constant";

// firestore collection name
const BUSINESS_DAYS = "business_days";
const TIMEZONES = "timezones";

const actions: ActionTree<ShopState, RootState> = {
  /**
   * 店舗情報取得
   */
  [FETCH]: ({ commit }) => {
    // todo: fetch firestore
    const businessDays: BusinessDay[] = [
      { business_date: new Date("2020-03-14") },
      { business_date: new Date("2020-03-21") },
      { business_date: new Date("2020-03-28") }
    ];
    const timezones: Timezone[] = [
      { text: "11:00 - 12:00" },
      { text: "12:30 - 13:30" },
      { text: "14:00 - 15:00" }
    ];

    commit(SET_BUSINESS_DAYS, businessDays);
    commit(SET_TIMEZONES, timezones);
  },

  /**
   * 営業日保存
   */
  [SAVE_BUSINESS_DAY]: async ({ commit }, businessDay: BusinessDay) => {
    const db = firebase.firestore();
    return await db.collection(BUSINESS_DAYS).add({
      business_date: businessDay.business_date
    });
  },

  /**
   * 営業日削除
   */
  [DELETE_BUSINESS_DAY]: ({ commit }, businessDay: BusinessDay) => {
    // todo: delete firestore request
    console.log("delete business day");
  }
};

export default actions;
