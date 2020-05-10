import { ActionTree } from "vuex";

// entity
import { ReservationResendMail } from "@/entity/reservation-resend-mail";

// store
import { RootState } from "@/store";
import { SEND_MAIL } from "@/store/constant";
import { ReservationResendMailState } from "@/store/reservation-resend-mail";

const actions: ActionTree<ReservationResendMailState, RootState> = {
  [SEND_MAIL]: async ({ commit }, model: ReservationResendMail) => {
    // todo: call cloud function
    console.log(model);
  }
};

export default actions;
