import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getCollection = () => {
  return firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore().collection("reservations");
};

describe("reservation security rules tests", () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });

  describe("Create security rule tests", () => {
    it("Can create document", async () => {
      const doc = getCollection().doc();
      await firebase.assertSucceeds(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 1,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Can create document when number_of_reservations less than 8", async () => {
      const doc = getCollection().doc();
      await firebase.assertSucceeds(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 8,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when request size less than 10", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com"
        })
      );
    });

    it("Cannot create document when request size more than 10", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_date", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_date_id", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_start_time", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_end_time", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_time_id", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reserver_name", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain number_of_reservations", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain tel", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          mail: "test@email.com",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain mail", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          comment: "this is test data",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain comment", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when reservation_date is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: null,
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when reservation_date_id is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: null,
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when reservation_start_time is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: null,
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when reservation_end_time is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: null,
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when reservation_time_id is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: null,
          reserver_name: "test",
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when reserver_name is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: null,
          number_of_reservations: 2,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when number_of_reservations is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: null,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when number_of_reservations less than 1", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 0,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when number_of_reservations more than 9", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 9,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when tel is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 1,
          tel: null,
          mail: "test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when mail is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 1,
          tel: "09012345678",
          mail: null,
          comment: "this is test data"
        })
      );
    });

    it("Cannot create document when comment is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 1,
          tel: "09012345678",
          mail: "test@email.com",
          comment: null
        })
      );
    });
  });

  describe("Update security rule tests", () => {
    const docId = "test_reservation";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        reservation_date: new Date(),
        reservation_date_id: "test_reservation_date_id",
        reservation_start_time: new Date(),
        reservation_end_time: new Date(),
        reservation_time_id: "test_reservation_time_id",
        reserver_name: "test",
        number_of_reservations: 1,
        tel: "09012345678",
        mail: "test@email.com",
        comment: "this is test data"
      });
    });

    it("Can update document", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(
        doc.update({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 1,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "update comment"
        })
      );
    });

    it("Cannot update document when it's not exist", async () => {
      const doc = getCollection().doc("not_exist_reservation");
      await firebase.assertFails(
        doc.update({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "test",
          number_of_reservations: 1,
          tel: "09012345678",
          mail: "test@email.com",
          comment: "update comment"
        })
      );
    });
  });

  describe("Update security rule tests", () => {
    const docId = "test_reservation";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        reservation_date: new Date(),
        reservation_date_id: "test_reservation_date_id",
        reservation_start_time: new Date(),
        reservation_end_time: new Date(),
        reservation_time_id: "test_reservation_time_id",
        reserver_name: "test",
        number_of_reservations: 1,
        tel: "09012345678",
        mail: "test@email.com",
        comment: "this is test data"
      });
    });

    it("Can update document", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(
        doc.update({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "edited test",
          number_of_reservations: 1,
          tel: "09012345678",
          mail: "edit-test@email.com",
          comment: "this is test data"
        })
      );
    });

    it("Cannot update document", async () => {
      const doc = getCollection().doc("is_not_exist_reservation");
      await firebase.assertFails(
        doc.update({
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          reserver_name: "edited test",
          number_of_reservations: 1,
          tel: "09012345678",
          mail: "edit-test@email.com",
          comment: "this is test data"
        })
      );
    });
  });

  describe("Delete security rule tests", () => {
    const docId = "test_reservation";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        reservation_date: new Date(),
        reservation_date_id: "test_reservation_date_id",
        reservation_start_time: new Date(),
        reservation_end_time: new Date(),
        reservation_time_id: "test_reservation_time_id",
        reserver_name: "test",
        number_of_reservations: 1,
        tel: "09012345678",
        mail: "test@email.com",
        comment: "this is test data"
      });
    });

    it("Can delete document", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(doc.delete());
    });
  });

  describe("Get security rule tests", () => {
    const docId = "test_reservation";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        reservation_date: new Date(),
        reservation_date_id: "test_reservation_date_id",
        reservation_start_time: new Date(),
        reservation_end_time: new Date(),
        reservation_time_id: "test_reservation_time_id",
        reserver_name: "test",
        number_of_reservations: 1,
        tel: "09012345678",
        mail: "test@email.com",
        comment: "this is test data"
      });
    });

    it("Can read document", async () => {
      const doc = getCollection().doc(docId);
      const promise = await doc.get();
      expect(promise.exists).toBeTruthy();
    });

    it("Cannot read document  when it's not exist", async () => {
      const doc = getCollection().doc("not_exist_reservation");
      const promise = await doc.get();
      expect(promise.exists).toBeFalsy();
    });
  });
});
