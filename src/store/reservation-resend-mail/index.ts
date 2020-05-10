import { Module } from "vuex";

// entity
import { ReservationResendMail } from "@/entity/reservation-resend-mail";

// store
import { RootState } from "@/store";
import mutations from "@/store/reservation-resend-mail/mutations";

export interface ReservationResendMailState {
  reservationResendMail: ReservationResendMail;
}

const state: ReservationResendMailState = {
  reservationResendMail: {} as ReservationResendMail
};
const namespaced = true;
const module: Module<ReservationResendMailState, RootState> = {
  namespaced,
  state,
  mutations
};

export default module;
