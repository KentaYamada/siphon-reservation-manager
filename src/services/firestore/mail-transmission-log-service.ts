import firebase from "@/plugins/firebase";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";
import { MailTransmissionLogSearchOption } from "@/entity/mail-transmission-log-search-option";

export class MailTransmissionLogService {
  private static _getCollection() {
    return firebase.firestore().collection("mail_transmission_logs");
  }

  static async fetch(payload: MailTransmissionLogSearchOption) {
    const collection = MailTransmissionLogService._getCollection();
    const snap = await collection.orderBy("send_datetime", "desc").limit(20).get();
    const items: Array<MailTransmissionLog> = snap.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        mail: data?.mail,
        redirect_url: data?.redirect_url,
        reserver_name: data?.reserver_name,
        send_datetime: data?.send_datetime.toDate(),
        type: data?.type,
        type_name: data?.type_name
      } as MailTransmissionLog;
    });

    return items;
    // return [
    //   {
    //     id: "1",
    //     mail: "test@email.com",
    //     redirect_url: "",
    //     reserver_name: "Test 太郎",
    //     send_datetime: new Date(),
    //     type: "reservation_create",
    //     // type: "cancel_reservation",
    //     type_name: "予約作成"
    //   },
    //   {
    //     id: "2",
    //     mail: "test@email.com",
    //     redirect_url: "",
    //     reserver_name: "Test 太郎",
    //     send_datetime: new Date(),
    //     type: "reservation_create",
    //     // type: "cancel_reservation",
    //     type_name: "予約作成"
    //   }
    // ] as Array<MailTransmissionLog>;
  }
}
