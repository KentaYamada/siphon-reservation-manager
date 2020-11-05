import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import firebase from "@/plugins/firebase";

export class NewYearDishesReservationService {
  private static _getCollection() {
    return firebase.firestore().collection("new_year_dishes_reservations");
  }

  static add(payload: NewYearDishesReservation): Observable<void> {
    if (!payload) {
      return new Observable(subscriber => subscriber.error());
    }

    console.log(payload);
    const collection = NewYearDishesReservationService._getCollection();
    const docRef = collection.doc();
    const data: firebase.firestore.DocumentData = {
      quantity: payload.quantity,
      reserver_name: payload.reserver_name,
      address: payload.address,
      tel: payload.tel,
      mail: payload.mail,
      comment: payload.comment,
      is_delivered: false
    };

    return from(docRef.set(data));
  }

  static fetch(): Observable<Array<NewYearDishesReservation>> {
    const collection = NewYearDishesReservationService._getCollection();

    return from(collection.get()).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          return {
            id: doc.id,
            quantity: doc.data().quantity,
            reserver_name: doc.data().reserver_name,
            address: doc.data().address,
            tel: doc.data().tel,
            mail: doc.data().mail,
            comment: doc.data().comment,
            is_delivered: doc.data().is_delivered
          } as NewYearDishesReservation;
        });
      })
    );
  }

  static cancel(id: string): Observable<void> {
    if (!id) {
      return new Observable(subscriber => subscriber.error());
    }

    const docRef = NewYearDishesReservationService._getCollection().doc(id);

    return from(docRef.delete());
  }
}
