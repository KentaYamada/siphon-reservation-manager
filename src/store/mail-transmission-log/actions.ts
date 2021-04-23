import { ActionTree } from "vuex";
import { MailTransmissionLogSearchOption } from "@/entity/mail-transmission-log-search-option";
import { MailTransmissionLogService } from "@/services/firestore/mail-transmission-log-service";
import { RootState } from "@/store";
import { FETCH, LAZY_LOAD, SET_ITEMS, UPDATE_END_CURSOR, UPDATE_START_CURSOR } from "@/store/constant";
import { MailTransmissionLogState } from "@/store/mail-transmission-log";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";

const actions: ActionTree<MailTransmissionLogState, RootState> = {
  [FETCH]: async ({ commit }, payload: MailTransmissionLogSearchOption) => {
    commit(SET_ITEMS, []);
    commit(UPDATE_START_CURSOR, null);
    commit(UPDATE_END_CURSOR, null);

    const promise$ = await MailTransmissionLogService.fetch(payload);
    let items: Array<MailTransmissionLog> = [];

    promise$.forEach(doc => {
      const data = doc.data();
      const item: MailTransmissionLog = {
        id: doc.id,
        mail: data.mail,
        redirect_url: data.redirect_url,
        reserver_name: data.reserver_name,
        send_datetime: data?.send_datetime.toDate(),
        type: data.type,
        type_name: data.type_name
      };
      items.push(item);
    });

    if (items.length > 0 && payload.keyword !== "") {
      items = items.filter(item => {
        return item.reserver_name.indexOf(payload.keyword) > -1 || item.mail.indexOf(payload.keyword) > -1;
      });
    }

    commit(SET_ITEMS, items);
    commit(UPDATE_START_CURSOR, promise$.docs[promise$.size - 1]);

    return promise$;
  },

  [LAZY_LOAD]: async ({ commit }, payload: MailTransmissionLogSearchOption) => {
    const promise$ = await MailTransmissionLogService.fetch(payload);
    let items: Array<MailTransmissionLog> = [];

    promise$.forEach(doc => {
      const data = doc.data();
      const item: MailTransmissionLog = {
        id: doc.id,
        mail: data.mail,
        redirect_url: data.redirect_url,
        reserver_name: data.reserver_name,
        send_datetime: data?.send_datetime.toDate(),
        type: data.type,
        type_name: data.type_name
      };
      items.push(item);
    });

    if (items.length > 0 && payload.keyword !== "") {
      items = items.filter(item => {
        return item.reserver_name.indexOf(payload.keyword) > -1 || item.mail.indexOf(payload.keyword) > -1;
      });
    }

    commit(SET_ITEMS, items);
    commit(UPDATE_END_CURSOR, payload.page.start);
    commit(UPDATE_START_CURSOR, promise$.docs[promise$.size - 1]);

    return promise$;
  }
};

export default actions;
