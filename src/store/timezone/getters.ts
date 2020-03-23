import { GetterTree } from "vuex";

// plugin
import _ from "lodash";
import moment from "moment";

// store
import { RootState } from "@/store";
import { GET_RESERVABLE_TIMEZONES, HAS_ITEMS } from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const getters: GetterTree<TimezoneState, RootState> = {
  /**
   * 予約時間帯データがあるかどうか
   * @param state
   * @returns boolean
   */
  [HAS_ITEMS]: (state: TimezoneState): boolean => {
    return state.timezones.length > 0;
  },

  /**
   * 予約可能な時間帯取得
   *
   */
  [GET_RESERVABLE_TIMEZONES]: (state: TimezoneState): Timezone[] => {
    const today = new Date();
    const timezones = _.filter(state.timezones, (timezone: Timezone) => {
      const diffTime = timezone.start_time.getHours() - today.getHours();
      return diffTime > 0;
    });

    return timezones;
  }
};

export default getters;
