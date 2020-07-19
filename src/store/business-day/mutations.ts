import { MutationTree } from "vuex";

// entity
import { BusinessDay } from "@/entity/business-day";
import { SelectableTimezone } from "@/entity/selectable-timezone";

// store
import { INITIALIZE, SET_ITEMS, SET_SELECTABLE_TIMEZONES } from "@/store/constant";
import { BusinessDayState } from "@/store/business-day";

const mutations: MutationTree<BusinessDayState> = {
  /**
   * 営業日設定データ初期化
   */
  [INITIALIZE]: (state: BusinessDayState): void => {
    state.businessDay = {
      text: "",
      business_date: new Date(),
      timezones: []
    } as BusinessDay;
  },

  /**
   * 営業日一覧データセット
   * @param items
   */
  [SET_ITEMS]: (state: BusinessDayState, items: BusinessDay[]): void => {
    state.businessDays = items;
  },

  /**
   * 選択可能な予約時間セット
   */
  [SET_SELECTABLE_TIMEZONES]: (state: BusinessDayState, timezones: Array<SelectableTimezone>): void => {
    if (state.businessDay) {
      state.businessDay.timezones = timezones;
    }
  }
};

export default mutations;
