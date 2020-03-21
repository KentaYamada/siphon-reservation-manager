import { MutationTree } from "vuex";

// entity
import { BusinessDay } from "@/entity/business-day";

// store
import { HAS_ITEMS } from "@/store/constant";
import { BusinessDayState } from "@/store/business-day";

const mutations: MutationTree<BusinessDayState> = {
  /**
   * 営業日一覧データセット
   * @param items
   */
  [HAS_ITEMS]: (state: BusinessDayState, items: BusinessDay[]): void => {
    state.businessDays = items;
  }
};

export default mutations;
