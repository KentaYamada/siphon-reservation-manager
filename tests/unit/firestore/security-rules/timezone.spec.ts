import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getCollection = () => {
  return firebase
    .initializeTestApp({
      projectId: MY_PROJECT_ID,
      auth: { uid: "test", email: "taro@email.com" }
    })
    .firestore()
    .collection("timezones");
};

describe("Timezone security rules tests", () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });

  describe("Get security rule tests", () => {
    it("read items in the timezone", async () => {
      const doc = getCollection().doc();
      await firebase.assertSucceeds(doc.get());
    });
  });

  describe("Create security rule tests", () => {
    it("Can create document", async () => {
      const doc = getCollection().doc();
      await firebase.assertSucceeds(
        doc.set({
          start_time: new Date(),
          end_time: new Date(),
          is_default_select: true
        })
      );
    });

    it("Cannot create document when request data size less than 3", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          start_time: new Date(),
          end_time: new Date()
        })
      );
    });

    it("Cannot create document when request data size more than 3", async () => {
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

    it("Cannot create document when request is not contain start_time", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          hoge: "hoge",
          end_time: new Date(),
          is_default_select: true
        })
      );
    });

    it("Cannot create document when request is no contain end_time", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          start_time: new Date(),
          hoge: "hoge",
          is_default_select: true
        })
      );
    });

    it("Cannot create document when request is no contain is_default_select", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          start_time: new Date(),
          end_time: new Date(),
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when start_time is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          start_time: null,
          end_time: new Date(),
          is_default_select: true
        })
      );
    });

    it("Cannot create document when end_time is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          start_time: new Date(),
          end_time: null,
          is_default_select: true
        })
      );
    });

    it("Cannot create document when is_default_select is null", async () => {
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

  describe("Update security rule tests", () => {
    const docId = "test_timezone_id";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        start_time: new Date(),
        end_time: new Date(),
        is_default_select: true
      });
    });

    it("Can update document", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(
        doc.update({
          start_time: new Date(),
          end_time: new Date(),
          is_default_select: false
        })
      );
    });

    it("Cannot update document", async () => {
      const doc = getCollection().doc("is_not_exist_timezone");
      await firebase.assertFails(
        doc.update({
          start_time: new Date(),
          end_time: new Date(),
          is_default_select: false
        })
      );
    });
  });

  describe("Delete security rule tests", () => {
    const docId = "test_timezone_id";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        start_time: new Date(),
        end_time: new Date(),
        is_default_select: true
      });
    });

    it("Can delete document", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(doc.delete());
    });
  });
});
