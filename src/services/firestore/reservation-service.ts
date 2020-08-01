import _ from "lodash";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import firebase from "@/plugins/firebase";

export class ReservationService {
  private readonly COLLECTION_NAME: string = "reservations";

  fetch(option: ReservationSearchOption) {
    if (_.isNil(option)) {
      return Promise.reject();
    }

    let query = firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .where("reservation_date_id", "==", option.reservation_date_id);

    if (!_.isEmpty(option.reservation_time_id)) {
      query = query.where("reservation_time_id", "==", option.reservation_time_id);
    }

    return query.get();
  }

  fetchById(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject();
    }

    return firebase.firestore().collection(this.COLLECTION_NAME).doc(id).get();
  }
}
