import firebase from "@/plugins/firebase";
import _ from "lodash";
import { Timezone } from "@/entity/timezone";

/**
 * Timezone collection CRUD service
 */
export class TimezoneService {
  private readonly COLLECTION_NAME: string = "timezones";

  add(timezone: Timezone) {
    if (_.isNil(timezone)) {
      return Promise.reject();
    }

    // todo: type safe
    const requestBody = {
      start_time: timezone.start_time,
      end_time: timezone.end_time,
      is_default_select: timezone.is_default_select
    };

    return firebase.firestore().collection(this.COLLECTION_NAME).add(requestBody);
  }

  edit(timezone: Timezone) {
    if (_.isNil(timezone) || _.isNil(timezone.id)) {
      return Promise.reject();
    }

    // todo: type safe
    const requestBody = {
      start_time: timezone.start_time,
      end_time: timezone.end_time,
      is_default_select: timezone.is_default_select
    };

    return firebase.firestore().collection(this.COLLECTION_NAME).doc(timezone.id).set(requestBody);
  }

  delete(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject();
    }

    return firebase.firestore().collection(this.COLLECTION_NAME).doc(id).delete();
  }

  fetch() {
    return firebase.firestore().collection(this.COLLECTION_NAME).get();
  }

  fetchById(id: string) {
    if (_.isEmpty(id)) {
      return Promise.reject();
    }

    return firebase.firestore().collection(this.COLLECTION_NAME).doc(id).get();
  }
}
