import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { HAS_ITEMS } from "@/store/constant";
import { MailTransmissionLogState } from "@/store/mail-transmission-log";

const getters: GetterTree<MailTransmissionLogState, RootState> = {
  [HAS_ITEMS]: (state: MailTransmissionLogState): boolean => {
    return state.mailTransmissionLogs.length > 0;
  }
};

export default getters;
