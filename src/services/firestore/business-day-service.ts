import firebase from "@/plugins/firebase";
import _ from "lodash";
import moment from "moment";
import { BusinessDay } from "@/entity/business-day";

export class BusinessDayService {
  private readonly COLLECTION_NAME: string = "business_days";

  add(businessDay: BusinessDay) {
    if (_.isNil(businessDay)) {
      return Promise.reject();
    }

    // todo: type safe
    const requestBody = {
      business_date: businessDay.business_date
    };

    return firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .add(requestBody);
  }

  edit(businessDay: BusinessDay) {
    if (_.isNil(businessDay) || _.isNil(businessDay.id)) {
      return Promise.reject();
    }

    // todo: type safe
    const requestBody = {
      business_date: businessDay.business_date
    };

    return firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(businessDay.id)
      .set(requestBody);
  }

  delete(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject();
    }

    return firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .doc(id)
      .delete();
  }

  fetch() {
    const query = firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .orderBy("business_date", "asc");

    return query.get();
  }

  fetchByAfterToday() {
    const query = firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .where("business_date", ">=", moment().toDate())
      .orderBy("business_date", "asc");

    return query.get();
  }
}
