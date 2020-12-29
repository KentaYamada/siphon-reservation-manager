import { Observable, from } from "rxjs";
import { ReservationCancelLog } from "@/entity/reservation-cancel-log";
import { ReservationCancelLogSearchOption } from "@/entity/reservation-cancel-log-search-option";
import firebase from "@/plugins/firebase";

export class ReservationCancelLogService {
  static fetch(params: ReservationCancelLogSearchOption): Observable<Array<ReservationCancelLog>> {
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
