import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { HAS_ITEMS, IS_LOAD_COMPLETED } from "@/store/constant";
import { MailTransmissionLogState } from "@/store/mail-transmission-log";

const getters: GetterTree<MailTransmissionLogState, RootState> = {
  [HAS_ITEMS]: (state: MailTransmissionLogState): boolean => {
    return state.mailTransmissionLogs.length > 0;
  },

  [IS_LOAD_COMPLETED]: (state: MailTransmissionLogState): boolean => {
    if (!state.searchOption.page.start || !state.searchOption.page.start) {
      return false;
    }

    return state.searchOption.page.end === state.searchOption.page.start;
  }
};

export default getters;
