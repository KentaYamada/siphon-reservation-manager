import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getCollection = () => {
  return firebase
    .initializeTestApp({ projectId: MY_PROJECT_ID })
    .firestore()
    .collection("new_year_dishes_reservations");
};

describe("New year dishes security rules tests", () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });

  describe("Create security rule tests", () => {
    it("Can create document", async () => {
      const docRef = getCollection().doc();
      await firebase.assertSucceeds(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when request data size less than 7", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data"
        })
      );
    });

    it("Cannot create document when request data size more than 8", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false,
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain quantity", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false,
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reserver_name", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false,
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain address", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false,
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain tel", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false,
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain mail", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          comment: "test data",
          is_delivered: false,
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain comment", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          is_delivered: false,
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain is_delivered", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when quantity is null", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: null,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when quantity less than 1", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 0,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when reserver_name is null", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: null,
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when reserver_name is empty", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when address is null", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: null,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when address is empty", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when tel is null", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: null,
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when tel is empty", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when mail is null", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: null,
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when mail is empty", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "",
          comment: "test data",
          is_delivered: false
        })
      );
    });

    it("Cannot create document when comment is null", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: null,
          is_delivered: false
        })
      );
    });

    it("Cannot create document when comment is null", async () => {
      const docRef = getCollection().doc();
      await firebase.assertFails(
        docRef.set({
          quantity: 1,
          reserver_name: "Test Taro",
          address: "Osaka Japan",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "test data",
          is_delivered: null
        })
      );
    });
  });
});
