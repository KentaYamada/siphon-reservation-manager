import { ActionTree } from "vuex";
import _ from "lodash";
import moment from "moment";
import { BusinessDay } from "@/entity/business-day";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { BusinessDayService } from "@/services/firestore/business-day-service";
import { TimezoneService } from "@/services/firestore/timezone-service";
import { RootState } from "@/store";
import { BusinessDayState } from "@/store/business-day";
import {
  DELETE,
  FETCH,
  FETCH_BY_ID,
  FETCH_BUSINESS_DATE_AFTER_TODAY,
  FETCH_SELECTABLE_TIMEZONES,
  SAVE,
  SET_ITEM,
  SET_ITEMS,
  SET_SELECTABLE_TIMEZONES
} from "@/store/constant";

const actions: ActionTree<BusinessDayState, RootState> = {
  [FETCH]: async ({ commit }) => {
    const service = new BusinessDayService();
    const businessDays: Array<BusinessDay> = [];
    const businessDaysDoc = await service.fetch();

    businessDaysDoc.forEach(doc => {
      const businessDate = doc.data().business_date.toDate();
      businessDays.push({
        id: doc.id,
        business_date: businessDate,
        text: moment(businessDate).format("YYYY年MM月DD日")
      });
    });

    commit(SET_ITEMS, businessDays);

    return businessDaysDoc;
  },

  [FETCH_BUSINESS_DATE_AFTER_TODAY]: async ({ commit }) => {
    const service = new BusinessDayService();
    const businessDaysRef = await service.fetchByAfterToday();
    const businessDays: Array<BusinessDay> = [];

    businessDaysRef.forEach(async doc => {
      const timezonesRef = await doc.ref.collection(service.subCollectionName).where("selected", "==", true).get();
      const timezones: Array<SelectableTimezone> = _.chain(timezonesRef.docs)
        .map(doc => {
          return {
            id: doc.id,
            start_time: doc.data()?.start_time.toDate(),
            end_time: doc.data()?.end_time.toDate(),
            selected: doc.data()?.selected
          } as SelectableTimezone;
        })
        .sortBy((t: SelectableTimezone) => t.start_time.getHours())
        .value();
      const data = doc.data();
      const businessDay: BusinessDay = {
        id: doc.id,
        text: moment(data.business_date.toDate()).format("YYYY年MM月DD日"),
        business_date: data.business_date.toDate(),
        timezones: timezones
      };

      businessDays.push(businessDay);
    });

    commit(SET_ITEMS, businessDays);

    return businessDaysRef;
  },

  [FETCH_SELECTABLE_TIMEZONES]: async ({ commit }) => {
    const service = new TimezoneService();
    const timezonesRef = await service.fetch();
    const timezones: Array<SelectableTimezone> = _.chain(timezonesRef.docs)
      .map(doc => {
        const selected = _.isNil(doc.data().is_default_select) ? false : doc.data()?.is_default_select;
        return {
          id: doc.id,
          start_time: doc.data()?.start_time.toDate(),
          end_time: doc.data()?.end_time.toDate(),
          selected: selected
        } as SelectableTimezone;
      })
      .sortBy((t: SelectableTimezone) => t.start_time.getTime())
      .value();

    commit(SET_SELECTABLE_TIMEZONES, timezones);

    return timezonesRef;
  },

  [FETCH_BY_ID]: async ({ commit }, id: string) => {
    const service = new BusinessDayService();
    const businessDayRef = await service.fetchById(id);

    if (!businessDayRef.exists || _.isNil(businessDayRef.data())) {
      return Promise.reject();
    }

    const timezonesRef = await businessDayRef.ref.collection(service.subCollectionName).get();
    const timezones: Array<SelectableTimezone> = _.chain(timezonesRef.docs)
      .map(doc => {
        return {
          id: doc.id,
          start_time: doc.data().start_time.toDate(),
          end_time: doc.data().end_time.toDate(),
          selected: doc.data().selected
        } as SelectableTimezone;
      })
      .sortBy((t: SelectableTimezone) => t.start_time.getHours())
      .value();
    const businessDate = businessDayRef.data()?.business_date.toDate();
    const businessDay: BusinessDay = {
      id: businessDayRef.id,
      business_date: businessDate,
      text: moment(businessDate).format("YYYY年MM月DD日"),
      timezones: timezones
    };

    commit(SET_ITEM, businessDay);

    return businessDayRef;
  },

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

  [DELETE]: async ({ commit }, id: string) => {
    const service = new BusinessDayService();
    return await service.delete(id);
  }
};

export default actions;
