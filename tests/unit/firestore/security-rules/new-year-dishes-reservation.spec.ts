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
  });
});
