import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getBusinessDays = () => {
  return firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore().collection("business_days");
};

describe("business day & timezones security rules tests", () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });

  it("read items in the business days", async () => {
    const businessDays = getBusinessDays();
    await firebase.assertSucceeds(businessDays.get());
  });

  it("Can write document in the business day", async () => {
    const doc = getBusinessDays().doc();
    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can write document in the business day when published_datetime is null", async () => {
    const doc = getBusinessDays().doc();
    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: null,
        is_pause: true
      })
    );
  });

  it("Can't write document when request data size less than 3", async () => {
    const doc = getBusinessDays().doc();
    await firebase.assertFails(
      doc.set({
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when request data size more than 3", async () => {
    const doc = getBusinessDays().doc();
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
    const doc = getBusinessDays().doc();
    await firebase.assertFails(
      doc.set({
        hoge: "hoge",
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when request is no published_datetime", async () => {
    const doc = getBusinessDays().doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        hoge: "hoge",
        is_pause: true
      })
    );
  });

  it("Can't write document when business_date is null", async () => {
    const doc = getBusinessDays().doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        hoge: "hoge"
      })
    );
  });

  it("Can't write document when business_date is null", async () => {
    const doc = getBusinessDays().doc();
    await firebase.assertFails(
      doc.set({
        business_date: null,
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when is_pause is null", async () => {
    const doc = getBusinessDays().doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: null
      })
    );
  });

  it("Can write timezones in the business day", async () => {
    const businessDays = getBusinessDays();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc();

    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );

    await firebase.assertSucceeds(
      subDoc.set({
        start_time: new Date(),
        end_time: new Date(),
        selected: true
      })
    );
  });

  it("Can't write timezones in the business day when request size less than 3", async () => {
    const businessDays = getBusinessDays();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc();

    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );

    await firebase.assertFails(
      subDoc.set({
        start_time: new Date(),
        end_time: new Date()
      })
    );
  });

  it("Can't write timezones in the business day when request size more than 3", async () => {
    const businessDays = getBusinessDays();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc();

    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );

    await firebase.assertFails(
      subDoc.set({
        start_time: new Date(),
        end_time: new Date(),
        selected: true,
        hoge: "hoge"
      })
    );
  });

  it("Can't write timezones when request is not contain start_time", async () => {
    const businessDays = getBusinessDays();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc();

    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );

    await firebase.assertFails(
      subDoc.set({
        hoge: "hoge",
        end_time: new Date(),
        selected: true
      })
    );
  });

  it("Can't write timezones when request is not contain end_time", async () => {
    const businessDays = getBusinessDays();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc();

    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );

    await firebase.assertFails(
      subDoc.set({
        start_time: new Date(),
        hoge: "hoge",
        selected: true
      })
    );
  });

  it("Can't write timezones when request is not contain selected", async () => {
    const businessDays = getBusinessDays();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc();

    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );

    await firebase.assertFails(
      subDoc.set({
        start_time: new Date(),
        end_time: new Date(),
        hoge: "hoge"
      })
    );
  });

  it("Can't write timezones when start_time is null", async () => {
    const businessDays = getBusinessDays();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc();

    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );

    await firebase.assertFails(
      subDoc.set({
        start_time: null,
        end_time: new Date(),
        selected: true
      })
    );
  });

  it("Can't write timezones when end_time is null", async () => {
    const businessDays = getBusinessDays();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc();

    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );

    await firebase.assertFails(
      subDoc.set({
        start_time: new Date(),
        end_time: null,
        selected: true
      })
    );
  });

  it("Can't write timezones when end_time is null", async () => {
    const businessDays = getBusinessDays();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc();

    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );

    await firebase.assertFails(
      subDoc.set({
        start_time: new Date(),
        end_time: new Date(),
        selected: null
      })
    );
  });
});
