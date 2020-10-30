import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import firebase from "@/plugins/firebase";

export class NewYearDishesSettingService {
  private static readonly ID = "1";
  private static readonly COLLECTION_NAME = "new_year_dishes_settings";

  private static _getCollection() {
    return firebase.firestore().collection(NewYearDishesSettingService.COLLECTION_NAME);
  }

  static save(payload: NewYearDishesSetting): Observable<void> {
    const docRef = NewYearDishesSettingService._getCollection().doc(NewYearDishesSettingService.ID);
    const today = new Date();
    const data: firebase.firestore.DocumentData = {
      start_datetime: payload.start_datetime,
      end_datetime: payload.end_datetime,
      receptions: payload.receptions,
      is_pause: payload.is_pause,
      image: payload.image
    };

    const promise$ = payload.id ? docRef.update(data) : docRef.set(data);

    return from(promise$);
  }

  static fetch(): Observable<NewYearDishesSetting> {
    const docRef = NewYearDishesSettingService._getCollection().doc(NewYearDishesSettingService.ID);

    return from(docRef.get()).pipe(
      map(snapshot => {
        return {
          id: snapshot.id,
          start_datetime: snapshot.data()?.start_datetime.toDate(),
          end_datetime: snapshot.data()?.end_datetime.toDate(),
          receptions: snapshot.data()?.receptions,
          is_pause: snapshot.data()?.is_pause,
          image: snapshot.data()?.image
        } as NewYearDishesSetting;
      })
    );
  }
}
