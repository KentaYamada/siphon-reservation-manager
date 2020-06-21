import { GetterTree } from "vuex";

// entity
import { TemporaryBusiness } from "@/entity/temporary-business";
import { Timezone } from "@/entity/timezone";

// plugin
import _ from "lodash";
import moment from "moment";

// store
import { RootState } from "@/store";
import { GET_BY_ID, GET_RESERVABLE_TIMEZONES, GET_TIMEZONES_BY_RESERVATION_DATE, HAS_ITEMS } from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const TEMPORARY_BUSINESSES: TemporaryBusiness[] = [
  {
    business_date: "2020-07-08",
    start_hour: 11,
    start_minutes: 0,
    end_hour: 12,
    end_minutes: 30
  },
  {
    business_date: "2020-07-08",
    start_hour: 13,
    start_minutes: 0,
    end_hour: 14,
    end_minutes: 30
  }
];

const filterTimezone = (timezone: Timezone, business: TemporaryBusiness): boolean => {
  const isMatchStartHour = timezone.start_time.getHours() === business.start_hour;
  const isMatchStartMinutes = timezone.start_time.getMinutes() === business.start_minutes;
  const isMatchEndHours = timezone.end_time.getHours() === business.end_hour;
  const isMatchEndMinutes = timezone.end_time.getMinutes() === business.end_minutes;
  return isMatchStartHour && isMatchStartMinutes && isMatchEndHours && isMatchEndMinutes;
};

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
    let timezones: Timezone[] = _.clone(state.timezones);
    const filterdTimezones: Timezone[] = [];

    _.each(TEMPORARY_BUSINESSES, (business: TemporaryBusiness) => {
      const isSame = moment(business.business_date, "YYYY-MM-DD").isSame(target);

      if (isSame) {
        const item = _.find(timezones, (timezone: Timezone) => {
          return filterTimezone(timezone, business);
        });
        filterdTimezones.push(item);
      } else {
        timezones = _.reject(timezones, (timezone: Timezone) => {
          return filterTimezone(timezone, business);
        });
      }
    });

    if (filterdTimezones.length > 0) {
      timezones = filterdTimezones;
    }

    return timezones;
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
