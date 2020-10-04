import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";

describe("business day security rules tests", () => {
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });

  it("read items in the business days", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const doc = db.collection("business_days").doc("testId");
    await firebase.assertSucceeds(doc.get());
  });

  it("Can write document in the business day", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const doc = db.collection("business_days").doc();
    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when request data size less than 3", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const doc = db.collection("business_days").doc();
    await firebase.assertFails(
      doc.set({
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when request data size more than 3", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const doc = db.collection("business_days").doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true,
        hoge: "hoge"
      })
    );
  });

  it("Can't write document when request is no businass_date", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const doc = db.collection("business_days").doc();
    await firebase.assertFails(
      doc.set({
        hoge: "hoge",
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when request is no published_datetime", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const doc = db.collection("business_days").doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        hoge: "hoge",
        is_pause: true
      })
    );
  });

  it("Can't write document when business_date is null", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const doc = db.collection("business_days").doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        hoge: "hoge"
      })
    );
  });

  it("Can't write document when business_date is null", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const doc = db.collection("business_days").doc();
    await firebase.assertFails(
      doc.set({
        business_date: null,
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when is_pause is null", async () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore();
    const doc = db.collection("business_days").doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: null
      })
    );
  });
});
