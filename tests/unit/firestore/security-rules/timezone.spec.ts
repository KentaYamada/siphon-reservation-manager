import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getCollection = () => {
  return firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore().collection("timezones");
};

describe("timezone security rules tests", () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });

  it("read items in the timezone", async () => {
    const doc = getCollection().doc();
    await firebase.assertSucceeds(doc.get());
  });

  it("Can write document in the timezones", async () => {
    const doc = getCollection().doc();
    await firebase.assertSucceeds(
      doc.set({
        start_time: new Date(),
        end_time: new Date(),
        is_default_select: true
      })
    );
  });

  it("Can't write document in the timezones when data size less than 3", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        start_time: new Date(),
        end_time: new Date()
      })
    );
  });

  it("Can't write document in the timezones when data size more than 3", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        start_time: new Date(),
        end_time: new Date(),
        is_default_select: true,
        hoge: "hoge"
      })
    );
  });

  it("Can't write document in the timezones when request is no contain start_time", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        hoge: "hoge",
        end_time: new Date(),
        is_default_select: true
      })
    );
  });

  it("Can't write document in the timezones when request is no contain end_time", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        start_time: new Date(),
        hoge: "hoge",
        is_default_select: true
      })
    );
  });

  it("Can't write document in the timezones when request is no contain is_default_select", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        start_time: new Date(),
        end_time: new Date(),
        hoge: "hoge"
      })
    );
  });

  it("Can't write document in the timezones when start_time is null", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        start_time: null,
        end_time: new Date(),
        is_default_select: true
      })
    );
  });

  it("Can't write document in the timezones when end_time is null", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        start_time: new Date(),
        end_time: null,
        is_default_select: true
      })
    );
  });

  it("Can't write document in the timezones when is_default_select is null", async () => {
    const doc = getCollection().doc();
    await firebase.assertFails(
      doc.set({
        start_time: new Date(),
        end_time: new Date(),
        is_default_select: null
      })
    );
  });
});
