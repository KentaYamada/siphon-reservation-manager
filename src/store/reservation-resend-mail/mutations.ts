import { MutationTree } from "vuex";

// entity
import { ReservationResendMail } from "@/entity/reservation-resend-mail";

// store
import { INITIALIZE } from "@/store/constant";
import { ReservationResendMailState } from "@/store/reservation-resend-mail";

const mutations: MutationTree<ReservationResendMailState> = {
  [INITIALIZE]: (state: ReservationResendMailState): void => {
    state.reservationResendMail = {
      reservation_id: "",
      reservation_date_id: "",
      reservation_time_id: "",
      reserver_name: "",
      tel: "",
      mail: ""
    } as ReservationResendMail;
  }
};

export default mutations;
