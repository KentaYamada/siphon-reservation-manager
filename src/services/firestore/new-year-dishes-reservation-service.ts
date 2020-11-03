import { Observable, from } from "rxjs";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import firebase from "@/plugins/firebase";

export class NewYearDishesReservationService {
  private static _getCollection() {
    return firebase.firestore().collection("new_year_dishes_reservations");
  }

  static fetch(): Observable<Array<NewYearDishesReservation>> {
    return new Observable(subscriber => {
      const data: Array<NewYearDishesReservation> = [
        {
          id: "test",
          quantity: 1,
          reserver_name: "蒲生 花子",
          address: "大阪市鶴見区",
          tel: "09012345678",
          mail: "sweets.sukiko@email.com",
          comment: "むっちゃ楽しみにしてます！",
          is_delivered: false
        },
        {
          id: "test",
          quantity: 1,
          reserver_name: "蒲生 花子2",
          address: "大阪市鶴見区",
          tel: "09012345678",
          mail: "sweets.sukiko@email.com",
          comment: "むっちゃ楽しみにしてます！",
          is_delivered: false
        }
      ];

      subscriber.next(data);
    });
  }

  static cancel(id: string): Observable<void> {
    if (!id) {
      return new Observable(subscriber => subscriber.error());
    }

    return new Observable(subscriber => subscriber.next());
  }
}
