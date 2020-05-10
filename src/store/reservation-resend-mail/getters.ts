import { GetterTree } from "vuex";

// store
import { RootState } from "@/store";
import { CAN_SEND_MAIL } from "@/store/constant";
import { ReservationResendMailState } from "@/store/reservation-resend-mail";

const getters: GetterTree<ReservationResendMailState, RootState> = {
  [CAN_SEND_MAIL]: (state: ReservationResendMailState): boolean => {
    const item = state.reservationResendMail;
    return (
      item.reservation_id !== "" ||
      item.reservation_date_id !== "" ||
      item.reservation_time_id !== "" ||
      item.reserver_name !== "" ||
      item.tel !== ""
    );
  }
};

export default getters;
