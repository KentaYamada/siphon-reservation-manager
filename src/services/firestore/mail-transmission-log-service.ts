import firebase from "@/plugins/firebase";
import { MailTransmissionLogSearchOption } from "@/entity/mail-transmission-log-search-option";

export class MailTransmissionLogService {
  private static _getCollection() {
    return firebase.firestore().collection("mail_transmission_logs");
  }

  static fetch(payload: MailTransmissionLogSearchOption): Promise<firebase.firestore.QuerySnapshot> {
    let query = MailTransmissionLogService._getCollection().orderBy("send_datetime", "asc");

    if (payload.send_date) {
      query = query.where("send_datetime", ">=", payload.send_date);
    }

    if (payload.page.start) {
      query = query.startAfter(payload.page.start);
    }

    if (payload.page.end) {
      query = query.endBefore(payload.page.end);
    }

    query = query.limit(payload.page.limit as number);

    return query.get();
  }
}
