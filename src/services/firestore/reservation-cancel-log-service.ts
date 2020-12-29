import { Observable, from } from "rxjs";
import { isEmpty } from "lodash";
import { ReservationCancelLog } from "@/entity/reservation-cancel-log";
import { ReservationCancelLogSearchOption } from "@/entity/reservation-cancel-log-search-option";
import firebase from "@/plugins/firebase";

export class ReservationCancelLogService {
  // private static getCollection() {
  //   return firebase.firestore().collection("reservation_cancel_logs");
  // }

  static fetch(params: ReservationCancelLogSearchOption): Observable<Array<ReservationCancelLog>> {
    // let query = ReservationCancelLogService.getCollection().where(
    //   "reservation_date_id",
    //   "==",
    //   params.reservation_date_id
    // );

    // if (!isEmpty(params.reservation_time_id)) {
    //   query = query.where("reservation_time_id", "==", params.reservation_time_id);
    // }

    // return from(query.get());

    return new Observable(subscriber => {
      const items: Array<ReservationCancelLog> = [
        {
          id: "1",
          canceled_at: new Date(),
          reservation_id: "abc",
          reservation_date: new Date(),
          reserver_name: "Gamoyon 花子",
          mail: "sweets.sukiko@email.com",
          tel: "09012345678",
          seats: [1, 2]
        },
        {
          id: "2",
          canceled_at: new Date(),
          reservation_id: "def",
          reservation_date: new Date(),
          reserver_name: "Gamoyon 太郎",
          mail: "sweets.sukiko@email.com",
          tel: "09012345678",
          seats: [3, 4]
        }
      ];
      subscriber.next(items);
      subscriber.complete();
    });
  }
}
