import firebase from "@/plugins/firebase";
import _ from "lodash";
import moment from "moment";

import { BusinessDay } from "@/entity/business-day";
import { SelectableTimezone } from "@/entity/selectable-timezone";

export class BusinessDayService {
  private readonly COLLECTION_NAME: string = "business_days";
  private readonly SUB_COLLECTION_NAME: string = "timezones";

  get subCollectionName(): string {
    return this.SUB_COLLECTION_NAME;
  }

  async add(businessDay: BusinessDay) {
    const collection = firebase.firestore().collection(this.COLLECTION_NAME);
    const businessDays = await collection.where("business_date", "==", businessDay.business_date).get();

    if (!businessDays.empty) {
      return Promise.reject();
    }

    const businessDayRef = collection.doc();
    businessDayRef.set({
      business_date: businessDay.business_date,
      is_pause: businessDay.is_pause,
      published_datetime: businessDay.published_datetime
    });

    const batch = firebase.firestore().batch();
    _.each(businessDay.timezones, (timezone: SelectableTimezone) => {
      const timezoneRef = businessDayRef.collection("timezones").doc(timezone.id);

      batch.set(timezoneRef, {
        start_time: timezone.start_time,
        end_time: timezone.end_time,
        selected: timezone.selected
      });
    });

    batch.commit();

    return businessDayRef;
  }

  async edit(businessDay: BusinessDay) {
    if (_.isNil(businessDay) || _.isNil(businessDay.id)) {
      return Promise.reject();
    }

    const db = firebase.firestore();
    const transaction = await db.runTransaction(async transaction => {
      const businessDayRef = db.collection(this.COLLECTION_NAME).doc(businessDay.id);
      const hasDoc = await transaction.get(businessDayRef);

      if (!hasDoc.exists) {
        return Promise.reject();
      }

      transaction.update(businessDayRef, {
        business_date: businessDay.business_date,
        is_pause: businessDay.is_pause,
        published_datetime: businessDay.published_datetime
      });

      const timezonesRef = businessDayRef.collection(this.SUB_COLLECTION_NAME);
      const existTimezones = await timezonesRef.get();

      _.each(businessDay.timezones, async (timezone: SelectableTimezone) => {
        const timezoneRef = timezonesRef.doc(timezone.id);

        if (existTimezones.empty) {
          transaction.set(timezoneRef, {
            start_time: timezone.start_time,
            end_time: timezone.end_time,
            selected: timezone.selected
          });
        } else {
          transaction.update(timezoneRef, {
            selected: timezone.selected
          });
        }
      });

      return businessDayRef;
    });

    return transaction;
  }

  async delete(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject();
    }

    const db = firebase.firestore();
    const transaction = db.runTransaction(async transaction => {
      const businessDayRef = db.collection(this.COLLECTION_NAME).doc(id);
      const hasDoc = await transaction.get(businessDayRef);

      if (!hasDoc.exists) {
        return Promise.reject();
      }

      const timezones = await businessDayRef.collection(this.subCollectionName).get();
      timezones.forEach(doc => transaction.delete(doc.ref));
      transaction.delete(businessDayRef);
    });

    return transaction;
  }

  fetch() {
    const today = moment()
      .set({
        hour: 0,
        minutes: 0,
        second: 0,
        millisecond: 0
      })
      .toDate();
    return firebase.firestore().collection(this.COLLECTION_NAME).orderBy("business_date", "asc").startAt(today).get();
  }

  fetchReservableBusinessDays() {
    const today = moment()
      .set({
        hour: 0,
        minutes: 0,
        second: 0,
        millisecond: 0
      })
      .toDate();

    return firebase
      .firestore()
      .collection(this.COLLECTION_NAME)
      .where("is_pause", "==", false)
      .orderBy("business_date", "asc")
      .startAfter(today)
      .get();
  }

  fetchById(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject();
    }

    return firebase.firestore().collection(this.COLLECTION_NAME).doc(id).get();
  }
}
