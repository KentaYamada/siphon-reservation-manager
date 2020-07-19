import { ActionTree } from "vuex";

// entity
import { BusinessDay } from "@/entity/business-day";
import { SelectableTimezone } from "@/entity/selectable-timezone";

// plugin
import _ from "lodash";
import moment from "moment";

// service
import { BusinessDayService } from "@/services/firestore/business-day-service";
import { TimezoneService } from "@/services/firestore/timezone-service";

// store
import { RootState } from "@/store";
import { BusinessDayState } from "@/store/business-day";
import {
  DELETE,
  FETCH,
  FETCH_BUSINESS_DATE_AFTER_TODAY,
  FETCH_SELECTABLE_TIMEZONES,
  SAVE,
  SET_ITEMS,
  SET_SELECTABLE_TIMEZONES
} from "@/store/constant";

const actions: ActionTree<BusinessDayState, RootState> = {
  /**
   * 営業日一覧取得
   */
  [FETCH]: async ({ commit }) => {
    const service = new BusinessDayService();
    const promise$ = await service.fetch();
    const businessDays: Array<BusinessDay> = [];

    promise$.forEach(doc => {
      // todo: generics entity
      const data = doc.data();
      const businessDay: BusinessDay = {
        id: doc.id,
        text: moment(data.business_date.toDate()).format("YYYY年MM月DD日"),
        business_date: data.business_date.toDate()
      };

      businessDays.push(businessDay);
    });

    commit(SET_ITEMS, businessDays);

    return promise$;
  },

  /**
   * アクセス日以降の営業日を取得
   */
  [FETCH_BUSINESS_DATE_AFTER_TODAY]: async ({ commit }) => {
    const service = new BusinessDayService();
    const promise$ = await service.fetchByAfterToday();
    const businessDays: Array<BusinessDay> = [];

    promise$.forEach(doc => {
      // todo: convert entity
      const data = doc.data();
      const businessDay: BusinessDay = {
        id: doc.data().id,
        text: moment(data.business_date.toDate()).format("YYYY年MM月DD日"),
        business_date: data.business_date.toDate()
      };

      businessDays.push(businessDay);
    });

    commit(SET_ITEMS, businessDays);

    return promise$;
  },

  /**
   * 選択可能な予約時間帯取得
   */
  [FETCH_SELECTABLE_TIMEZONES]: async ({ commit }) => {
    const service = new TimezoneService();
    const promise$ = await service.fetch();
    let timezones: Array<SelectableTimezone> = [];

    promise$.forEach(doc => {
      const data = doc.data();
      let selected = false;

      if (!_.isNil(data.is_default_select)) {
        selected = data.is_default_select;
      }

      const timezone: SelectableTimezone = {
        id: doc.id,
        start_time: data.start_time.toDate(),
        end_time: data.end_time.toDate(),
        selected: selected
      };

      timezones.push(timezone);
    });

    timezones = _.sortBy(timezones, (timezone: SelectableTimezone) => {
      return timezone.start_time.getHours();
    });

    commit(SET_SELECTABLE_TIMEZONES, timezones);

    return promise$;
  },

  /**
   * 営業日保存
   * @param businessDay
   */
  [SAVE]: async ({ commit }, businessDay: BusinessDay) => {
    const service = new BusinessDayService();
    let promise$ = null;

    if (_.isNil(businessDay.id)) {
      promise$ = service.add(businessDay);
    } else {
      promise$ = service.edit(businessDay);
    }

    return await promise$;
  },

  /**
   * 営業日削除
   * @param id
   */
  [DELETE]: async ({ commit }, id: string) => {
    const service = new BusinessDayService();
    return await service.delete(id);
  }
};

export default actions;
