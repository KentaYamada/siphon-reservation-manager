import { MutationTree } from "vuex";
import { BusinessDay } from "@/entity/business-day";
import { Timezone } from "@/entity/timezone";
import { ShopState } from "@/store/shop";
import { SET_BUSINESS_DAYS, SET_TIMEZONES } from "@/store/constant";

const mutations: MutationTree<ShopState> = {
  /**
   * 営業日一覧データセット
   */
  [SET_BUSINESS_DAYS]: (state: ShopState, items: BusinessDay[]): void => {
    state.businessDays = items;
  },

  /**
   * 営業時間帯データセット
   */
  [SET_TIMEZONES]: (state: ShopState, items: Timezone[]): void => {
    state.timezones = items;
  }
};

export default mutations;
