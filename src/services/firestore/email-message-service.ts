import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EmailMessage } from "@/entity/email-message";
import firebase from "@/plugins/firebase";

export class EmailMessageService {
  static readonly COLLECTION_NAME = "email_messages";

  static fetch(): Observable<Array<EmailMessage>> {
    return new Observable(subscriber => {
      const messages: Array<EmailMessage> = [
        {
          id: "reserved",
          subject: "[Cafe de GAMOYON] 予約完了しました",
          body: "Thank you for reservation"
        },
        {
          id: "edited",
          subject: "[Cafe de GAMOYON] 予変更了しました",
          body: "Thank you for reservation"
        },
        {
          id: "canceled",
          subject: "[Cafe de GAMOYON] 予約キャンセルしました",
          body: "Thank you for reservation"
        }
      ];
      subscriber.next(messages);
    });
  }
}
