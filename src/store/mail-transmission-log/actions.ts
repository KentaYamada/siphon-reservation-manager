import { ActionTree } from "vuex";
import { MailTransmissionLogSearchOption } from "@/entity/mail-transmission-log-search-option";
import { MailTransmissionLogService } from "@/services/firestore/mail-transmission-log-service";
import { RootState } from "@/store";
import { FETCH, SET_ITEMS } from "@/store/constant";
import { MailTransmissionLogState } from "@/store/mail-transmission-log";

const actions: ActionTree<MailTransmissionLogState, RootState> = {
  [FETCH]: async ({ commit }, payload: MailTransmissionLogSearchOption) => {
    const items = await MailTransmissionLogService.fetch(payload);
    commit(SET_ITEMS, items);
  }
};

export default actions;
