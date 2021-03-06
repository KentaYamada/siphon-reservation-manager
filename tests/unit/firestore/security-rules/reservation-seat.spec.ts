import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getCollection = () => {
  return firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore().collection("reservation_seats");
};

describe("reservation seats security rules tests", () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });

  describe("Create security rule tests", () => {
    it("Can Create document", async () => {
      const doc = getCollection().doc();
      await firebase.assertSucceeds(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when request size less than 8", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when request size more than 8", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain seat_no", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain is_reserved", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_id", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_date", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_date_id", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_start_time", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_end_time", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_time_id: "test_reservation_time_id",
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when request is not contain reservation_time_id", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when seat_no less than 1", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 0,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when seat_no more than 1", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 5,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when seat_no more than 4", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 5,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when seat_no is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: null,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when is_reserved is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: null,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when reservation_date is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: null,
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when reservation_date_id is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: null,
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when reservation_start_time is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: null,
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when reservation_end_time is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: null,
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot create document when reservation_time_id is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: null
        })
      );
    });

    it("Cannot create document when reservation_id isn't string", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          seat_no: 1,
          is_reserved: true,
          reservation_id: 32,
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });
  });

  describe("Update security rule tests", () => {
    const docId = "test_reservation_seat";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        seat_no: 1,
        is_reserved: true,
        reservation_id: "test_reservation",
        reservation_date: new Date(),
        reservation_date_id: "test_reservation_date_id",
        reservation_start_time: new Date(),
        reservation_end_time: new Date(),
        reservation_time_id: "test_reservation_time_id"
      });
    });

    it("Can update document in the reservation_seats", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(
        doc.update({
          seat_no: 1,
          is_reserved: false,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });

    it("Cannot update document when it doesn't exists", async () => {
      const doc = getCollection().doc("is_not_exist_reservation_seat");
      await firebase.assertFails(
        doc.update({
          seat_no: 1,
          is_reserved: true,
          reservation_id: "test_reservation",
          reservation_date: new Date(),
          reservation_date_id: "test_reservation_date_id",
          reservation_start_time: new Date(),
          reservation_end_time: new Date(),
          reservation_time_id: "test_reservation_time_id"
        })
      );
    });
  });

  describe("Delete security rule tests", () => {
    const docId = "test_reservation_seat";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        seat_no: 1,
        is_reserved: true,
        reservation_id: "test_reservation",
        reservation_date: new Date(),
        reservation_date_id: "test_reservation_date_id",
        reservation_start_time: new Date(),
        reservation_end_time: new Date(),
        reservation_time_id: "test_reservation_time_id"
      });
    });

    it("Can delete document in the reservation_seats", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(doc.delete());
    });
  });
});
