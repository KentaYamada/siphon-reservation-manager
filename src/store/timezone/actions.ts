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
import { DELETE, FETCH, SAVE, SET_ITEMS } from "@/store/constant";
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
      let isDefaultSelect = false;

      if (!_.isNil(data.is_default_select)) {
        isDefaultSelect = data.is_default_select;
      }

      const timezone: Timezone = {
        id: doc.id,
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
   * 予約時間帯保存
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
