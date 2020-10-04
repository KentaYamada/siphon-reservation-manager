import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getCollection = () => {
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
    const businessDays = getCollection();
    await firebase.assertSucceeds(businessDays.get());
  });

  it("Can write document in the business day", async () => {
    const doc = getCollection().doc();
    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can write document in the business day when published_datetime is null", async () => {
    const doc = getCollection().doc();
    await firebase.assertSucceeds(
      doc.set({
        business_date: new Date(),
        published_datetime: null,
        is_pause: true
      })
    );
  });

  it("Can't write document when request data size less than 3", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when request data size more than 3", async () => {
    const doc = getCollection().doc();
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
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        hoge: "hoge",
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when request is no published_datetime", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        hoge: "hoge",
        is_pause: true
      })
    );
  });

  it("Can't write document when business_date is null", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        hoge: "hoge"
      })
    );
  });

  it("Can't write document when business_date is null", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        business_date: null,
        published_datetime: new Date(),
        is_pause: true
      })
    );
  });

  it("Can't write document when is_pause is null", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: null
      })
    );
  });

  it("Can write timezones in the business day", async () => {
    const businessDays = getCollection();
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
    const businessDays = getCollection();
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
    const businessDays = getCollection();
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
    const businessDays = getCollection();
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
    const businessDays = getCollection();
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
    const businessDays = getCollection();
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
    const businessDays = getCollection();
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
    const businessDays = getCollection();
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
    const businessDays = getCollection();
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

  it("Can read document by id", async () => {
    const doc = getCollection().doc("test_business_day");
    await doc.set({
      business_date: new Date(),
      published_datetime: new Date(),
      is_pause: true
    });
    await firebase.assertSucceeds(doc.get());
  });

  it("Can't read document by id", async () => {
    const doc = getCollection().doc("does_not_exist_business_day");
    await firebase.assertFails(doc.get());
  });

  it("Can delete document by id", async () => {
    const doc = getCollection().doc("test_business_day");
    await doc.set({
      business_date: new Date(),
      published_datetime: new Date(),
      is_pause: true
    });
    await firebase.assertSucceeds(doc.delete());
  });

  it("Can't delete document by id", async () => {
    const doc = getCollection().doc("does_not_exist_business_day");
    await firebase.assertFails(doc.delete());
  });

  it("can read timezones by id in the business day", async () => {
    const businessdays = getCollection();
    const doc = businessdays.doc();
    const subdoc = doc.collection("timezones").doc();

    await doc.set({
      business_date: new Date(),
      published_datetime: new Date(),
      is_pause: true
    });

    await subdoc.set({
      start_time: new Date(),
      end_time: new Date(),
      selected: true
    });

    await firebase.assertSucceeds(subdoc.get());
  });

  it("Can't read timezones by id in the business day when timezone doesn't exist", async () => {
    const businessDays = getCollection();
    const doc = businessDays.doc();
    const subDoc = doc.collection("timezones").doc("not_exist_timezone");

    await doc.set({
      business_date: new Date(),
      published_datetime: new Date(),
      is_pause: true
    });

    await firebase.assertFails(subDoc.get());
  });

  it("Can update document in the business day", async () => {
    const doc = getCollection().doc();
    await doc.set({
      business_date: new Date(),
      published_datetime: new Date(),
      is_pause: true
    });
    await firebase.assertSucceeds(
      doc.update({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: false
      })
    );
  });

  it("Can't update document in the business day", async () => {
    const doc = getCollection().doc("not_exist_business_day");
    await firebase.assertFails(
      doc.update({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: false
      })
    );
  });

  it("Can update timezone in the business day", async () => {
    const businessdays = getCollection();
    const doc = businessdays.doc();
    const subdoc = doc.collection("timezones").doc();

    await doc.set({
      business_date: new Date(),
      published_datetime: new Date(),
      is_pause: true
    });

    await subdoc.set({
      start_time: new Date(),
      end_time: new Date(),
      selected: true
    });

    await firebase.assertSucceeds(
      subdoc.update({
        start_time: new Date(),
        end_time: new Date(),
        selected: true
      })
    );
  });

  it("Can't update timezone in the business day", async () => {
    const businessdays = getCollection();
    const doc = businessdays.doc();
    const subdoc = doc.collection("timezones").doc();

    await doc.set({
      business_date: new Date(),
      published_datetime: new Date(),
      is_pause: true
    });

    await firebase.assertFails(
      subdoc.update({
        start_time: new Date(),
        end_time: new Date(),
        selected: true
      })
    );
  });

  it("Can delete timezone in the business day", async () => {
    const businessdays = getCollection();
    const doc = businessdays.doc();
    const subdoc = doc.collection("timezones").doc();

    await doc.set({
      business_date: new Date(),
      published_datetime: new Date(),
      is_pause: true
    });

    await subdoc.set({
      start_time: new Date(),
      end_time: new Date(),
      selected: true
    });

    await firebase.assertSucceeds(Promise.all([subdoc.delete(), doc.delete()]));
  });

  it("Can't delete timezone in the business day when timezone is not exist", async () => {
    const businessdays = getCollection();
    const doc = businessdays.doc();
    const subdoc = doc.collection("timezones").doc();

    await doc.set({
      business_date: new Date(),
      published_datetime: new Date(),
      is_pause: true
    });

    await firebase.assertFails(Promise.all([subdoc.delete(), doc.delete()]));
  });
});
