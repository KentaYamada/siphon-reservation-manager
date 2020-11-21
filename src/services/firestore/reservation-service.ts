import _ from "lodash";
import { from, throwError, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Reservation } from "@/entity/reservation";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeat } from "@/entity/reservation-seat";
import firebase from "@/plugins/firebase";

export class ReservationService {
  private static readonly COLLECTION_NAME: string = "reservations";

  private static _getCollection() {
    return firebase.firestore().collection(ReservationService.COLLECTION_NAME);
  }

  static save(payload: Reservation): Observable<firebase.firestore.DocumentSnapshot> {
    if (!payload) {
      throwError("Error: 予約データがありません");
    }

    const db = firebase.firestore();
    const collection = db.collection(ReservationService.COLLECTION_NAME);
    const transaction$ = db.runTransaction(async transaction => {
      // todo: 座席引当
      const docRef = payload.id ? collection.doc(payload.id) : collection.doc();
      const doc = await transaction.get(docRef);
      const data: firebase.firestore.DocumentData = {
        reservation_date: payload.reservation_date,
        reservation_date_id: payload.reservation_date_id,
        reservation_start_time: payload.reservation_start_time,
        reservation_end_time: payload.reservation_end_time,
        reservation_time_id: payload.reservation_time_id,
        reserver_name: payload.reserver_name,
        number_of_reservations: payload.number_of_reservations,
        tel: payload.tel,
        mail: payload.mail,
        comment: payload.comment
      };

      if (doc.exists) {
        transaction.update(docRef, data);
      } else {
        transaction.set(docRef, data);
      }

      return docRef.get();
    });

    return from(transaction$);
  }

  static cancel(id: string): Observable<void> {
    if(!id) {
      throwError("不正なリクエストです。");
    }

    const docRef = ReservationService._getCollection().doc(id);

    return from(docRef.delete());
  }

  fetch(option: ReservationSearchOption) {
    if (_.isNil(option)) {
      return Promise.reject();
    }

    let query = firebase
      .firestore()
      .collection(ReservationService.COLLECTION_NAME)
      .where("reservation_date_id", "==", option.reservation_date_id);

    if (!_.isEmpty(option.reservation_time_id)) {
      query = query.where("reservation_time_id", "==", option.reservation_time_id);
    }

    return query.get();
  }

  static fetchById(id: string): Observable<Reservation> {
    if (!id) {
      throwError("不正なリクエストです");
    }
    const docRef = ReservationService._getCollection().doc(id);

    return from(docRef.get()).pipe(
      map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          reservation_date: data?.reservation_date?.toDate(),
          reservation_date_id: data?.reservation_date_id,
          reservation_end_time: data?.reservation_end_time.toDate(),
          reservation_start_time: data?.reservation_end_time.toDate(),
          reservation_time_id: data?.reservation_time_id,
          reserver_name: data?.reserver_name,
          number_of_reservations: data?.number_of_reservations,
          tel: data?.tel,
          mail: data?.mail,
          comment: data?.comment,
          reservation_seats: []
        } as Reservation;
      })
    );
  }
}
