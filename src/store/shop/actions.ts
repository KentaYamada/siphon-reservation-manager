import { ActionTree } from "vuex";
import { BusinessDay } from "@/entity/business-day";
import { Timezone } from "@/entity/timezone";
import { RootState } from "@/store";
import { ShopState } from "@/store/shop";
import { FETCH, SET_BUSINESS_DAYS, SET_TIMEZONES } from "@/store/constant";

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
  }
};

export default actions;
