import { Module } from "vuex";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";
import { MailTransmissionLogSearchOption } from "@/entity/mail-transmission-log-search-option";
import { RootState } from "@/store";
import actions from "@/store/mail-transmission-log/actions";
import getters from "@/store/mail-transmission-log/getters";
import mutations from "@/store/mail-transmission-log/mutations";

export interface MailTransmissionLogState {
  mailTransmissionLogs: Array<MailTransmissionLog>;
  searchOption: MailTransmissionLogSearchOption;
}

const state: MailTransmissionLogState = {
  mailTransmissionLogs: [],
  searchOption: {
    keyword: "",
    send_date: null
  }
};

const namespaced = true;
const module: Module<MailTransmissionLogState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};

export default module;
