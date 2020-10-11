import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse } from "@/entity/api-response";
import { EmailMessage } from "@/entity/email-message";
import firebase from "@/plugins/firebase";

export class EmailMessageService {
  static readonly COLLECTION_NAME = "email_messages";

  private static _getCollection() {
    return firebase.firestore().collection(EmailMessageService.COLLECTION_NAME);
  }

  static fetch(): Observable<Array<EmailMessage>> {
    return new Observable(subscriber => {
      const messages: Array<EmailMessage> = [
        {
          id: "reserved",
          theme: "is-success",
          category: "予約完了メッセージ",
          subject: "[Cafe de GAMOYON] 予約完了しました",
          body: "Thank you for reservation"
        },
        {
          id: "edited",
          theme: "is-info",
          category: "予約変更完了メッセージ",
          subject: "[Cafe de GAMOYON] 予変更了しました",
          body: "Thank you for reservation"
        },
        {
          id: "canceled",
          theme: "is-danger",
          category: "予約キャンセル完了メッセージ",
          subject: "[Cafe de GAMOYON] 予約キャンセルしました",
          body: "Thank you for reservation"
        }
      ];
      subscriber.next(messages);
    });
  }

  static fetchById(id: string): Observable<EmailMessage> {
    return new Observable(subscriber => {
      const message: EmailMessage = {
        id: "reserved",
        theme: "is-success",
        category: "予約完了メッセージ",
        subject: "[Cafe de GAMOYON] 予約完了しました",
        body: `Thank you for reservation
            {予約者名}
            {予約サイトURL}`
      };
      subscriber.next(message);
    });
  }

  static edit(payload: EmailMessage): Observable<ApiResponse<void>> {
    const docRef = EmailMessageService._getCollection().doc(payload.id);
    const data: firebase.firestore.DocumentData = {
      subject: payload.subject,
      body: payload.body
    };

    return from(docRef.update(data)).pipe(
      map(() => {
        return {
          message: "変更しました"
        } as ApiResponse<void>;
      })
    );
  }
}
