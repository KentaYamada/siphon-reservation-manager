import { GetterTree } from "vuex";

// plugin
import _ from "lodash";

// entity
import { BusinessDay } from "@/entity/business-day";

// store
import { RootState } from "@/store";
import { HAS_ITEMS, GET_BY_ID } from "@/store/constant";
import { BusinessDayState } from "@/store/business-day";

const getters: GetterTree<BusinessDayState, RootState> = {
  /**
   * 営業日取得
   * @param state
   * @returns BusinessDay
   */
  [GET_BY_ID]: (state: BusinessDayState) => (id: string): BusinessDay | undefined => {
    return _.find(state.businessDays, (item: BusinessDay) => {
      return item.id === id;
    });
  },

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
