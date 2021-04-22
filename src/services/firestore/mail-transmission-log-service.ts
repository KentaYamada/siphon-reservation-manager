import firebase from "@/plugins/firebase";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";
import { MailTransmissionLogSearchOption } from "@/entity/mail-transmission-log-search-option";

export class MailTransmissionLogService {
  private static _getCollection() {
    return firebase.firestore().collection("mail_transmission_logs");
  }

  static fetch(payload: MailTransmissionLogSearchOption) {
    return [
      {
        id: "1",
        mail: "test@email.com",
        redirect_url: "",
        reserver_name: "Test 太郎",
        send_datetime: new Date(),
        type: "reservation_create",
        // type: "cancel_reservation",
        type_name: "予約作成"
      },
      {
        id: "2",
        mail: "test@email.com",
        redirect_url: "",
        reserver_name: "Test 太郎",
        send_datetime: new Date(),
        type: "reservation_create",
        // type: "cancel_reservation",
        type_name: "予約作成"
      }
    ] as Array<MailTransmissionLog>;
  }
}
