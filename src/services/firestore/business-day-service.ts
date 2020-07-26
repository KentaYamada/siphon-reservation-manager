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

  async edit(businessDay: BusinessDay) {
    if (_.isNil(businessDay) || _.isNil(businessDay.id)) {
      return Promise.reject();
    }

    const db = firebase.firestore();
    const transaction = await db.runTransaction(async (transaction) => {
      const businessDayRef = db.collection(this.COLLECTION_NAME).doc(businessDay.id);
      const hasDoc = await transaction.get(businessDayRef);

      if (!hasDoc.exists) {
        return Promise.reject();
      }

      transaction.update(businessDayRef, {
        business_date: businessDay.business_date
      });

      _.each(businessDay.timezones, async (timezone: SelectableTimezone) => {
        const timezoneRef = businessDayRef.collection(this.SUB_COLLECTION_NAME).doc(timezone.id);
        transaction.update(timezoneRef, {
          selected: timezone.selected
        });
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
    const transaction = db.runTransaction(async (transaction) => {
      const businessDayRef = db.collection(this.COLLECTION_NAME).doc(id);
      const hasDoc = await transaction.get(businessDayRef);

      if (!hasDoc.exists) {
        return Promise.reject();
      }

      const timezones = await businessDayRef.collection(this.subCollectionName).get();
      timezones.forEach((doc) => {
        transaction.delete(doc.ref);
      });

      transaction.delete(businessDayRef);
    });

    return transaction;
  }

  async fetch() {
    const query = firebase.firestore().collection(this.COLLECTION_NAME).orderBy("business_date", "desc");

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

  async fetchById(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject();
    }

    return firebase.firestore().collection(this.COLLECTION_NAME).doc(id).get();
  }
}
