import { ActionTree } from "vuex";

// entity
import { BusinessDay } from "@/entity/business-day";

// plugin
import firebase from "@/plugins/firebase";
import _ from "lodash";
import moment from "moment";

// service
import { BusinessDayService } from "@/services/firestore/business-day-service";

// store
import { RootState } from "@/store";
import { DELETE, FETCH, FETCH_BUSINESS_DATE_AFTER_TODAY, SAVE, SET_ITEMS } from "@/store/constant";
import { BusinessDayState } from "@/store/business-day";

// firestore collection name
const COLLECTION_NAME = "business_days";

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
