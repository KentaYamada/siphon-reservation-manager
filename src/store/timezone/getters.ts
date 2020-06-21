import { GetterTree } from "vuex";

// entity
import { Timezone } from "@/entity/timezone";

// plugin
import _ from "lodash";
import moment from "moment";

// store
import { RootState } from "@/store";
import { GET_BY_ID, GET_RESERVABLE_TIMEZONES, GET_TIMEZONES_BY_RESERVATION_DATE, HAS_ITEMS } from "@/store/constant";
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
   * 予約日ごとの予約可能な時間帯を取得
   */
  [GET_TIMEZONES_BY_RESERVATION_DATE]: (state: TimezoneState) => (reservationDate: Date): Timezone[] => {
    const target = moment(reservationDate, "YYYY-MM-DD");
    const isSame = moment("2020-07-08").isSame(target);

    if (isSame) {
      const timezones = _.filter(state.timezones, (timezone: Timezone) => {
        const startHour = timezone.start_time.getHours();
        const startMinutes = timezone.start_time.getMinutes();
        const endHour = timezone.end_time.getHours();
        const endMinutes = timezone.end_time.getMinutes();

        // 11:00 - 12:30 or 13:00 - 14:30の受付のみにする
        return (
          (startHour === 11 && startMinutes === 0 && endHour === 12 && endMinutes === 30) ||
          (startHour === 13 && startMinutes === 0 && endHour === 14 && endMinutes === 30)
        );
      });

      return timezones;
    }

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
