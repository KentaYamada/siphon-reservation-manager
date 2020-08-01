import _ from "lodash";
import firebase from "@/plugins/firebase";

export class ReservationService {
  private readonly COLLECTION_NAME: string = "reservations";

  fetchById(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject();
    }

    return firebase.firestore().collection(this.COLLECTION_NAME).doc(id).get();
  }
}
