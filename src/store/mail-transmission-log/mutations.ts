import { MutationTree } from "vuex";
import { INITIALIZE, UPDATE_RESERVER_NAME, UPDATE_SEND_DATE } from "@/store/constant";
import { MailTransmissionLogState } from "@/store/mail-transmission-log";

const mutations: MutationTree<MailTransmissionLogState> = {
  [INITIALIZE]: (state: MailTransmissionLogState): void => {
    state.mailTransmissionLogs = [];
    state.searchOption.reserver_name = "";
    state.searchOption.send_date = null;
  },

  [UPDATE_RESERVER_NAME]: (state: MailTransmissionLogState, payload: string): void => {
    state.searchOption.reserver_name = payload;
  },

  [UPDATE_SEND_DATE]: (state: MailTransmissionLogState, payload: Date): void => {
    state.searchOption.send_date = payload;
  }
};

export default mutations;
