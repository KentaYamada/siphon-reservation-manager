import { MutationTree } from "vuex";
import { SET_ITEMS } from "@/store/constant";
import { Timezone } from "@/entity/timezone";
import { TimezoneState } from "@/store/timezone";

const mutations: MutationTree<TimezoneState> = {
  /**
   * 予約時間帯一覧データセット
   */
  [SET_ITEMS]: (state: TimezoneState, items: Timezone[]): void => {
    state.timezones = items;
  }
};

export default mutations;
