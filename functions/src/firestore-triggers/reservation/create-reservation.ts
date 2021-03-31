import * as functions from "firebase-functions";
import { MailTransmissionLogService } from "../../firestore-service/mail-transmission-log-service";
import { MailTransmissionLog } from "../../entity/mail-transmission-log";
import { getDateTimeNow } from "../../service/date-time-helper";

/**
 * Trigger create reservation document
 */
export const onCreateReservation = functions.firestore.document("reservations/{document}").onCreate(snap => {
  const nowDateTime = getDateTimeNow();
  const data: MailTransmissionLog = {
    send_datetime: nowDateTime,
    reserver_name: snap.data().reserver_name,
    mail: snap.data().mail,
    redirect_url: snap.data().redirect_url,
    type: "create_reservation",
    type_name: "予約作成",
    created_at: nowDateTime
  };

  return MailTransmissionLogService.add(data);
});
