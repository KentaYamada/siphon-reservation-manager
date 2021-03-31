import * as functions from "firebase-functions";
import { MailTransmissionLogService } from "../../firestore-service/mail-transmission-log-service";
import { MailTransmissionLog } from "../../entity/mail-transmission-log";
import { getDateTimeNow } from "../../service/date-time-helper";

/**
 * Trigger update reservation document
 */
export const onUpdateReservation = functions.firestore.document("reservations/{id}").onUpdate(snap => {
  const nowDateTime = getDateTimeNow();
  const data: MailTransmissionLog = {
    send_datetime: nowDateTime,
    reserver_name: snap.after.data().reserver_name,
    mail: snap.after.data().mail,
    redirect_url: snap.after.data().redirect_url,
    type: "edit_reservation",
    type_name: "予約変更",
    created_at: nowDateTime
  };

  return MailTransmissionLogService.add(data);
});
