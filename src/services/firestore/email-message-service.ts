import { from, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { EmailMessage } from "@/entity/email-message";
import firebase from "@/plugins/firebase";

export class EmailMessageService {
  static readonly COLLECTION_NAME = "email_messages";

  private static _getCollection() {
    return firebase.firestore().collection(EmailMessageService.COLLECTION_NAME);
  }

  static fetch(): Observable<Array<EmailMessage>> {
    const collection = EmailMessageService._getCollection();

    return from(collection.get()).pipe(
      filter(snapshot => !snapshot.empty),
      map(snapshot => {
        return snapshot.docs.map(doc => {
          return {
            id: doc.id,
            theme: doc.data()?.theme,
            category: doc.data()?.category,
            subject: doc.data()?.subject,
            body: doc.data()?.body
          } as EmailMessage;
        });
      })
    );
  }

  static fetchById(id: string): Observable<EmailMessage> {
    const docRef = EmailMessageService._getCollection().doc(id);

    return from(docRef.get()).pipe(
      filter(snapshot => snapshot.exists),
      map(snapshot => {
        return {
          id: snapshot.id,
          theme: snapshot.data()?.theme,
          category: snapshot.data()?.category,
          subject: snapshot.data()?.subject,
          body: snapshot.data()?.body
        } as EmailMessage;
      })
    );
  }

  static edit(payload: EmailMessage): Observable<void> {
    const docRef = EmailMessageService._getCollection().doc(payload.id);
    const data: firebase.firestore.DocumentData = {
      subject: payload.subject,
      body: payload.body
    };

    return from(docRef.update(data));
  }
}
