import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { HAS_BUSINESS_DAYS, HAS_TIMEZONES } from "@/store/constant";
import { ShopState } from "@/store/shop";

const getters: GetterTree<ShopState, RootState> = {
  /**
   * 営業日一覧データがあるかどうか
   * @param state
   * @returns boolean
   */
  [HAS_BUSINESS_DAYS]: (state: ShopState): boolean => {
    return state.businessDays.length > 0;
  },

  /**
   * 予約時間帯一覧データがあるかどうか
   * @param state
   * @returns boolean
   */
  [HAS_TIMEZONES]: (state: ShopState): boolean => {
    return state.timezones.length > 0;
  }
};

export default getters;
