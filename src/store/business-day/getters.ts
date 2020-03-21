import { GetterTree } from "vuex";

// store
import { RootState } from "@/store";
import { HAS_ITEMS } from "@/store/constant";
import { BusinessDayState } from "@/store/business-day";

const getters: GetterTree<BusinessDayState, RootState> = {
  /**
   * 営業日一覧データがあるかどうか
   * @param state
   * @returns boolean
   */
  [HAS_ITEMS]: (state: BusinessDayState): boolean => {
    return state.businessDays.length > 0;
  }
};

export default getters;
