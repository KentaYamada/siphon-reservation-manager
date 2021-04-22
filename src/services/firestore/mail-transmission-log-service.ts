import firebase from "@/plugins/firebase";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";
import { MailTransmissionLogSearchOption } from "@/entity/mail-transmission-log-search-option";

export class MailTransmissionLogService {
  private static _getCollection() {
    return firebase.firestore().collection("mail_transmission_logs");
  }

  static async fetch(payload: MailTransmissionLogSearchOption): Promise<Array<MailTransmissionLog>> {
    let query = MailTransmissionLogService._getCollection().orderBy("send_datetime", "desc").limit(20);

    if (payload.send_date) {
      query = query.where("send_datetime", "<=", payload.send_date);
    }

    const items = await (await query.get()).docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        mail: data.mail,
        redirect_url: data.redirect_url,
        reserver_name: data.reserver_name,
        send_datetime: data?.send_datetime.toDate(),
        type: data.type,
        type_name: data.type_name
      } as MailTransmissionLog;
    });

    if (payload.reserver_name !== "") {
      return items.filter(item => {
        return item.reserver_name.indexOf(payload.reserver_name) > -1;
      });
    }

    return items;
  }
}
