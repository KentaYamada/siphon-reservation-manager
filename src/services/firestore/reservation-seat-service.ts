import _ from "lodash";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import firebase from "@/plugins/firebase";

export class ReservationSeatService {
  private readonly COLLECTION_NAME: string = "reservation_seats";

  fetch(option: ReservationSearchOption) {
    if (_.isNil(option)) {
      return Promise.reject();
    }
    if (_.isEmpty(option.reservation_date_id) || _.isEmpty(option.reservation_time_id)) {
      return Promise.reject();
    }

    const query = firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .where("reservation_date_id", "==", option.reservation_date_id)
      .where("reservation_time_id", "==", option.reservation_time_id);

    return query.get();
  }
}
