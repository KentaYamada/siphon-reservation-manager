import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getCollection = () => {
  return firebase
    .initializeTestApp({
      projectId: MY_PROJECT_ID,
      auth: { uid: "test", email: "taro@email.com" }
    })
    .firestore()
    .collection("new_year_dishes_settings");
};

describe("new year dishes setting security rules tests", () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });

  describe("Create security rule tests", () => {
    it("Can create document", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertSucceeds(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when request data size less than 7", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: today
        })
      );
    });

    it("Cannot create document when request data size more than 8", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: today,
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain start_datetime", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when request is not contain end_datetime", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when request is not contain receptions", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when request is not contain is_pause", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when request is not contain image", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when request is not contain created_at", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          modified_at: today
        })
      );
    });

    it("Cannot create document when request is not contain modified_at", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: today
        })
      );
    });

    it("Cannot create document when start_datetime is invalid type", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: null,
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when end_datetime is invalid type", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: null,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when receptions is invalid type", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: null,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when receptions less than 1", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 0,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when is_pause is invalid type", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          is_pause: null,
          image: null,
          created_at: today,
          modified_at: today
        })
      );
    });

    it("Cannot create document when created_at is invalid type", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: null,
          modified_at: today
        })
      );
    });

    it("Cannot create document when modified_at is invalid type", async () => {
      const doc = getCollection().doc();
      const today = new Date();

      await firebase.assertFails(
        doc.set({
          start_datetime: today,
          end_datetime: today,
          receptions: 50,
          is_pause: false,
          image: null,
          created_at: today,
          modified_at: null
        })
      );
    });
  });
});
