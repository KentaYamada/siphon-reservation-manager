import * as functions from "firebase-functions";
import { MailTransmissionLogService } from "../../firestore-service/mail-transmission-log-service";
import { MailTransmissionLog } from "../../entity/mail-transmission-log";
import { getDateTimeNow } from "../../service/date-time-helper";

/**
 * Trigger delete reservation document
 */
export const onDeleteReservation = functions.firestore.document("reservations/{id}").onDelete(snap => {
  const nowDateTime = getDateTimeNow();
  const data: MailTransmissionLog = {
    send_datetime: nowDateTime,
    reserver_name: snap.data().reserver_name,
    mail: snap.data().mail,
    redirect_url: "",
    type: "cancel_reservation",
    type_name: "予約取消",
    created_at: nowDateTime
  };

  return MailTransmissionLogService.add(data);
});
