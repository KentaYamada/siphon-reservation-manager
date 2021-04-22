import { MutationTree } from "vuex";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";
import { INITIALIZE, SET_ITEMS, UPDATE_RESERVER_NAME, UPDATE_SEND_DATE } from "@/store/constant";
import { MailTransmissionLogState } from "@/store/mail-transmission-log";

const mutations: MutationTree<MailTransmissionLogState> = {
  [INITIALIZE]: (state: MailTransmissionLogState): void => {
    state.mailTransmissionLogs = [];
    state.searchOption.keyword = "";
    state.searchOption.send_date = null;
  },

  [SET_ITEMS]: (state: MailTransmissionLogState, payload: Array<MailTransmissionLog>): void => {
    state.mailTransmissionLogs = payload;
  },

  [UPDATE_RESERVER_NAME]: (state: MailTransmissionLogState, payload: string): void => {
    state.searchOption.keyword = payload;
  },

  [UPDATE_SEND_DATE]: (state: MailTransmissionLogState, payload: Date): void => {
    state.searchOption.send_date = payload;
  }
};

export default mutations;
