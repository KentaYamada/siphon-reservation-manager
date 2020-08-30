import { ActionTree } from "vuex";
import _ from "lodash";
import moment from "moment";
import { Timezone } from "@/entity/timezone";
import { TimezoneService } from "@/services/firestore/timezone-service";
import { RootState } from "@/store";
import { DELETE, FETCH, FETCH_BY_ID, SAVE, SET_ITEM, SET_ITEMS } from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const actions: ActionTree<TimezoneState, RootState> = {
  [FETCH]: async ({ commit }) => {
    const service = new TimezoneService();
    const timezonesRef = await service.fetch();
    const timezones: Array<Timezone> = _.chain(timezonesRef.docs)
      .map(doc => {
        const data = doc.data();
        let isDefaultSelect = false;

        if (!_.isNil(data.is_default_select)) {
          isDefaultSelect = data.is_default_select;
        }

        return {
          id: doc.id,
          start_time: data.start_time.toDate(),
          end_time: data.end_time.toDate(),
          is_default_select: isDefaultSelect
        } as Timezone;
      })
      .orderBy((t: Timezone) => moment(t.start_time).format("HHmmss"))
      .value();
    console.log(timezones);

    commit(SET_ITEMS, timezones);

    return timezonesRef;
  },

  [FETCH_BY_ID]: async ({ commit }, id: string) => {
    const service = new TimezoneService();
    const promise = await service.fetchById(id);

    if (!promise.exists || _.isNil(promise.data())) {
      return Promise.reject();
    }

    let isDefaultSelect = false;

    if (!_.isNil(promise.data())) {
      isDefaultSelect = promise.data()?.is_default_select;
    }

    const timezone: Timezone = {
      id: promise.id,
      start_time: promise.data()?.start_time.toDate(),
      end_time: promise.data()?.end_time.toDate(),
      is_default_select: isDefaultSelect
    };

    commit(SET_ITEM, timezone);

    return promise;
  },

  [SAVE]: async ({ commit }, timezone: Timezone) => {
    const service = new TimezoneService();
    let promise$ = null;

    if (_.isNil(timezone.id)) {
      promise$ = service.add(timezone);
    } else {
      promise$ = service.edit(timezone);
    }

    return await promise$;
  },

  [DELETE]: async ({ commit }, id: string) => {
    const service = new TimezoneService();
    return await service.delete(id);
  }
};

export default actions;
