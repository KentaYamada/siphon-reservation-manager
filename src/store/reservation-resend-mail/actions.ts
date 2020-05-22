import { ActionTree } from "vuex";

// entity
import { ReservationResendMail } from "@/entity/reservation-resend-mail";

// plugin
import firebase from "@/plugins/firebase";

// store
import { RootState } from "@/store";
import { SAVE } from "@/store/constant";
import { ReservationResendMailState } from "@/store/reservation-resend-mail";

// firebase collection name
const RESERVATION_RESEND_MAILS = "reservation_resend_mails";

const actions: ActionTree<ReservationResendMailState, RootState> = {
  [SAVE]: async ({ commit }, model: ReservationResendMail) => {
    const collection = firebase
      .firestore()
      .collection(RESERVATION_RESEND_MAILS);
    const data = {
      reservation_id: model.reservation_id,
      reservation_date_id: model.reservation_date_id,
      reservation_timezone_id: model.reservation_time_id,
      reserver_name: model.reserver_name,
      tel: model.tel,
      mail: model.mail
    };

    return await collection.add(data);
  }
};

export default actions;
