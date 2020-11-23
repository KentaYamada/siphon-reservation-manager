import { difference, range } from "lodash";
import { from, throwError, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Reservation } from "@/entity/reservation";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";
import firebase from "@/plugins/firebase";

export class ReservationService {
  /** 予約人数上限 */
  static readonly MAX_NUMBER_OF_RESERVATIONS = 8;

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
      // 座席引当
      const reservations = await collection
        .where("reservation_date_id", "==", payload.reservation_date_id)
        .where("reservation_time_id", "==", payload.reservation_time_id)
        .get();
      const reservedSeats: Array<number> = [];

      if (!reservations.empty) {
        reservations.forEach(doc => {
          if (doc.data()?.seats && payload.id !== doc.id) {
            reservedSeats.push(...(doc.data()?.seats as Array<number>));
          }
        });

        if (reservedSeats.length > 0 && difference(reservedSeats, payload.seats).length === 0) {
          return Promise.reject("選択した座席が予約済のため、予約処理に失敗しました");
        }
      }

      const docRef = payload.id ? collection.doc(payload.id) : collection.doc();
      const doc = await transaction.get(docRef);
      const today = new Date();
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
        comment: payload.comment,
        seats: payload.seats,
        modified_at: today
      };

      if (doc.exists) {
        transaction.update(docRef, data);
      } else {
        data.created_at = today;
        transaction.set(docRef, data);
      }

      return docRef.get();
    });

    return from(transaction$);
  }

  static cancel(id: string): Observable<void> {
    if (!id) {
      throwError("Error: 予約IDが空白です");
    }

    const docRef = ReservationService._getCollection().doc(id);

    return from(docRef.delete());
  }

  static fetch(option: ReservationSearchOption): Observable<Array<Reservation>> {
    if (!option) {
      throwError("Error: 検索できませんでした");
    }

    let query = ReservationService._getCollection().where("reservation_date_id", "==", option.reservation_date_id);

    if (option.reservation_time_id !== "") {
      query = query.where("reservation_time_id", "==", option.reservation_time_id);
    }

    return from(query.get()).pipe(
      filter(snapshot => !snapshot.empty),
      map(snapshot => {
        return snapshot.docs.map(doc => {
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
            seats: data?.seats ?? []
          } as Reservation;
        });
      })
    );
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
          seats: data?.seats ?? []
        } as Reservation;
      })
    );
  }

  static fetchSeats(params: ReservationSeatSearchOption): Observable<Array<ReservationSeat>> {
    const query = ReservationService._getCollection()
      .where("reservation_date_id", "==", params.reservation_date_id)
      .where("reservation_time_id", "==", params.reservation_time_id);
    const seats: Array<ReservationSeat> = [];

    from(range(ReservationService.MAX_NUMBER_OF_RESERVATIONS / 2))
      .pipe(
        map((no: number) => {
          return {
            seat_no: no + 1,
            is_reserved: false,
            is_selected: false,
            reservation_id: ""
          } as ReservationSeat;
        })
      )
      .subscribe((seat: ReservationSeat) => {
        seats.push(seat);
      });

    return from(query.get()).pipe(
      map(snapshot => {
        snapshot.forEach(doc => {
          const reservedSeats = doc.data().seats as Array<number> ?? [];
          const isMyReservation = doc.id === params.reservation_id;

          reservedSeats.forEach(reservedSeat => {
            seats.forEach(seat => {
              if (reservedSeat === seat.seat_no) {
                seat.is_reserved = !isMyReservation;
                seat.is_selected = isMyReservation;
                seat.reservation_id = doc.id;
              }
            });
          });
        });

        return seats;
      })
    );
  }
}
