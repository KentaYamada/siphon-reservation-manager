import { ActionTree } from "vuex";

// entity
import { Timezone } from "@/entity/timezone";

// plugin
import moment from "moment";
import _ from "lodash";

// firestore service
import { TimezoneService } from "@/services/firestore/timezones/timezone-service";

// store
import { RootState } from "@/store";
import { DELETE, FETCH, FETCH_ALL_RESERVED_TIMEZONES, SAVE, SET_ITEMS } from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const actions: ActionTree<TimezoneState, RootState> = {
  /**
   * 予約時間帯取得
   */
  [FETCH]: async ({ commit }) => {
    let timezones: Array<Timezone> = [];
    const service = new TimezoneService();
    const promise$ = await service.fetch();

    promise$.forEach(doc => {
      // todo: generics entity
      const data = doc.data();
      const period = `${moment(data.start_time.toDate()).format("HH:mm")} - 
        ${moment(data.end_time.toDate()).format("HH:mm")}`;
      let isDefaultSelect = false;

      if (!_.isNil(data.is_default_select)) {
        isDefaultSelect = data.is_default_select;
      }

      const timezone: Timezone = {
        id: doc.id,
        // todo: replace filter
        text: period,
        start_time: data.start_time.toDate(),
        end_time: data.end_time.toDate(),
        is_default_select: isDefaultSelect
      };
      timezones.push(timezone);
    });

    timezones = _.sortBy(timezones, (timezone: Timezone) => {
      return timezone.start_time.getHours();
    });

    commit(SET_ITEMS, timezones);

    return promise$;
  },

  /**
   * 予約時間帯取得
   */
  // [FETCH_ALL_RESERVED_TIMEZONES]: async ({ commit }) => {
  //   const collection = firebase.firestore().collection(COLLECTION_NAME);
  //   const items: Timezone[] = [];

  //   // todo: sort
  //   const $promise = collection.get().then(query => {
  //     query.forEach(doc => {
  //       const data = doc.data();
  //       const startTime = moment(data.start_time.toDate()).format("HH:mm");
  //       const endTime = moment(data.end_time.toDate()).format("HH:mm");
  //       const item: Timezone = {
  //         id: doc.id,
  //         text: `${startTime} - ${endTime}`,
  //         start_time: data.start_time.toDate(),
  //         end_time: data.end_time.toDate()
  //       };

  //       items.push(item);
  //     });

  //     commit(SET_ITEMS, items);
  //   });

  //   return await $promise;
  // },

  /**
   * 予約時間帯取得
   * @param timezone
   */
  [SAVE]: async ({ commit }, timezone: Timezone) => {
    const service = new TimezoneService();
    let promise$ = null;

    if (_.isEmpty(timezone.id)) {
      promise$ = service.add(timezone);
    } else {
      promise$ = service.edit(timezone);
    }

    return await promise$;
  },

  /**
   * 予約時間帯削除
   * @param id
   */
  [DELETE]: async ({ commit }, id: string) => {
    const service = new TimezoneService();
    return await service.delete(id);
  }
};

export default actions;
