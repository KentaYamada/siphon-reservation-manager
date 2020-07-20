import firebase from "@/plugins/firebase";
import _ from "lodash";
import moment from "moment";

import { BusinessDay } from "@/entity/business-day";
import { SelectableTimezone } from "@/entity/selectable-timezone";

export class BusinessDayService {
  private readonly COLLECTION_NAME: string = "business_days";

  async add(businessDay: BusinessDay) {
    const collection = firebase.firestore().collection(this.COLLECTION_NAME);
    const businessDays = await collection.where("business_date", "==", businessDay.business_date).get();

    if (!businessDays.empty) {
      return Promise.reject();
    }

    const businessDayRef = collection.doc();
    businessDayRef.set({ business_date: businessDay.business_date });

    const batch = firebase.firestore().batch();
    _.each(businessDay.timezones, (timezone: SelectableTimezone) => {
      const timezoneRef = businessDayRef.collection("timezones").doc();

      batch.set(timezoneRef, {
        start_time: timezone.start_time,
        end_time: timezone.end_time,
        selected: timezone.selected
      });
    });

    batch.commit();

    return businessDayRef;
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
