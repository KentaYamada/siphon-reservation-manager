import { Observable, from } from "rxjs";
import { filter, map } from "rxjs/operators";
import { doc } from "rxfire/firestore";
import { isNil } from "lodash";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import firebase from "@/plugins/firebase";

export class NewYearDishesReservationService {
  private static _getCollection() {
    return firebase.firestore().collection("new_year_dishes_reservations");
  }

  static add(payload: NewYearDishesReservation): Observable<firebase.firestore.DocumentSnapshot> {
    if (!payload) {
      return new Observable(subscriber => subscriber.error());
    }

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

    docRef.set(data);

    return doc(docRef);

    // return from(docRef.set(data));
  }

  static edit(payload: NewYearDishesReservation): Observable<firebase.firestore.DocumentSnapshot> {
    if (isNil(payload) || isNil(payload.id)) {
      return new Observable(subscriber => subscriber.error());
    }
    const docRef = NewYearDishesReservationService._getCollection().doc(payload.id);
    const data: firebase.firestore.DocumentData = {
      quantity: payload.quantity,
      reserver_name: payload.reserver_name,
      address: payload.address,
      tel: payload.tel,
      mail: payload.mail,
      comment: payload.comment,
      is_delivered: false
    };

    docRef.update(data);

    return doc(docRef);
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

  static fetchById(id: string): Observable<NewYearDishesReservation> {
    const docRef = NewYearDishesReservationService._getCollection().doc(id);

    return from(docRef.get()).pipe(
      filter(doc => doc.exists),
      map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          quantity: data?.quantity,
          reserver_name: data?.reserver_name,
          address: data?.address,
          tel: data?.tel,
          mail: data?.mail,
          comment: data?.comment,
          is_delivered: data?.is_delivered
        } as NewYearDishesReservation;
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
