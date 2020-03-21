import { GetterTree } from "vuex";

// store
import { RootState } from "@/store";
import { HAS_ITEMS } from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const getters: GetterTree<TimezoneState, RootState> = {
  /**
   * 予約時間帯データがあるかどうか
   * @param state
   * @returns boolean
   */
  [HAS_ITEMS]: (state: TimezoneState): boolean => {
    return state.timezones.length > 0;
  }
};

export default getters;
