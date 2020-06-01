import { GetterTree } from "vuex";

// entity
import { Timezone } from "@/entity/timezone";

// plugin
import _ from "lodash";

// store
import { RootState } from "@/store";
import {
  GET_BY_ID,
  GET_RESERVABLE_TIMEZONES,
  HAS_ITEMS
} from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const getters: GetterTree<TimezoneState, RootState> = {
  /**
   * 予約時間帯取得
   * @param state
   * @returns Timezone
   */
  [GET_BY_ID]: (state: TimezoneState) => (id: string): Timezone | undefined => {
    return _.find(state.timezones, (item: Timezone) => {
      return item.id === id;
    });
  },

  /**
   * 予約可能な時間帯取得
   * @param state
   * @returns Timezone[]
   */
  [GET_RESERVABLE_TIMEZONES]: (state: TimezoneState): Timezone[] => {
    return state.timezones;
  },

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
