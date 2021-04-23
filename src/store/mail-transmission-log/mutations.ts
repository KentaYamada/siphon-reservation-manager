import { MutationTree } from "vuex";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";
import {
  INITIALIZE,
  SET_ITEMS,
  UPDATE_END_CURSOR,
  UPDATE_RESERVER_NAME,
  UPDATE_SEND_DATE,
  UPDATE_START_CURSOR
} from "@/store/constant";
import { MailTransmissionLogState } from "@/store/mail-transmission-log";
import firebase from "firebase/";

const mutations: MutationTree<MailTransmissionLogState> = {
  [INITIALIZE]: (state: MailTransmissionLogState): void => {
    state.mailTransmissionLogs = [];
    state.searchOption.keyword = "";
    state.searchOption.send_date = null;
    state.searchOption.page.start = null;
    state.searchOption.page.end = null;
  },

  [SET_ITEMS]: (state: MailTransmissionLogState, payload: Array<MailTransmissionLog>): void => {
    state.mailTransmissionLogs.push(...payload);
  },

  [UPDATE_END_CURSOR]: (state: MailTransmissionLogState, payload: firebase.firestore.DocumentSnapshot): void => {
    state.searchOption.page.end = payload;
  },

  [UPDATE_RESERVER_NAME]: (state: MailTransmissionLogState, payload: string): void => {
    state.searchOption.keyword = payload;
  },

  [UPDATE_START_CURSOR]: (state: MailTransmissionLogState, payload: firebase.firestore.DocumentSnapshot): void => {
    state.searchOption.page.start = payload;
  },

  [UPDATE_SEND_DATE]: (state: MailTransmissionLogState, payload: Date): void => {
    state.searchOption.send_date = payload;
  }
};

export default mutations;
