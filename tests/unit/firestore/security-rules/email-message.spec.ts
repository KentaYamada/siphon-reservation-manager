import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getCollection = () => {
  return firebase
    .initializeTestApp({
      projectId: MY_PROJECT_ID,
      auth: { uid: "test", email: "taro@email.com" }
    })
    .firestore()
    .collection("email_messages");
};

describe("Email messages security rules tests", () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });

  describe("Create security rule tests", () => {
    it("Cannot create document when request size less than 2", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          subject: "test"
        })
      );
    });

    it("Cannot create document when request size more than 3", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          subject: "test",
          body: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain subject", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          body: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain body", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          subject: "test",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when subject is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          subject: null,
          body: "this is test data"
        })
      );
    });

    it("Cannot create document when body is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          subject: "test",
          body: null
        })
      );
    });
  });

  describe("Update security rule tests", () => {
    const docId = "test_email_message";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        subject: "test",
        body: "this is test data"
      });
    });

    it("Can update document", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(
        doc.update({
          subject: "test",
          body: "this is test data"
        })
      );
    });

    it("Cannot update document when it is not exist", async () => {
      const doc = getCollection().doc("is_not_exist_email_message");
      await firebase.assertFails(
        doc.update({
          subject: "test",
          body: "this is test data"
        })
      );
    });
  });

  describe("Delete security rule tests", () => {
    const docId = "test_email_message";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        subject: "test",
        body: "this is test data"
      });
    });

    it("Cannot delete document", async () => {
      const doc = getCollection().doc(docId);
      // delete request is not permission
      await firebase.assertFails(doc.delete());
    });
  });

  describe("List security rule tests", () => {
    beforeEach(async () => {
      const doc = getCollection().doc();
      await doc.set({
        subject: "test",
        body: "this is test data"
      });
    });

    it("Can read documents", async () => {
      const collection = getCollection();
      await firebase.assertSucceeds(collection.get());
    });
  });

  describe("Get security rule tests", () => {
    const docId = "test_email_message";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        subject: "test",
        body: "this is test data"
      });
    });

    it("Can read document by id", async () => {
      const doc = getCollection().doc(docId);
      const promise = await doc.get();
      expect(promise.exists).toBeTruthy();
    });

    it("Cannot update document when it is not exist", async () => {
      const doc = getCollection().doc("is_not_exist_email_message");
      const promise = await doc.get();
      expect(promise.exists).toBeFalsy();
    });
  });
});
