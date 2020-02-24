import { ActionTree } from "vuex";
import { Timezone } from "@/entity/timezone";
import { RootState } from "@/store";
import { FETCH, SET_ITEMS } from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const actions: ActionTree<TimezoneState, RootState> = {
  /**
   * 予約時間帯取得
   */
  [FETCH]: ({ commit }): void => {
    const timezones: Timezone[] = [
      {
        id: 1,
        text: "11:00 - 12:00"
      },
      {
        id: 2,
        text: "12:30 - 13:30"
      },
      {
        id: 3,
        text: "14:00 - 15:00"
      },
      {
        id: 4,
        text: "15:30 - 16:30"
      },
      {
        id: 5,
        text: "17:00 - 18:00"
      }
    ];
    commit(SET_ITEMS, timezones);
  }
};

export default actions;
