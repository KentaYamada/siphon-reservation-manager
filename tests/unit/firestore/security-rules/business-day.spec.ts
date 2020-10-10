import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "siphon-reservation-manager-dev";
const getCollection = () => {
  return firebase
    .initializeTestApp({
      projectId: MY_PROJECT_ID,
      auth: { uid: "test", email: "taro@email.com" }
    })
    .firestore()
    .collection("business_days");
};

describe("business day & timezones security rules tests", () => {
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
          business_date: new Date(),
          published_datetime: new Date(),
          is_pause: true
        })
      );
    });

    it("Can create document when published_datetime is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertSucceeds(
        doc.set({
          business_date: new Date(),
          published_datetime: null,
          is_pause: true
        })
      );
    });

    it("Cannot create document when request data size less than 3", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          published_datetime: new Date(),
          is_pause: true
        })
      );
    });

    it("Cannot create document when request data size more than 3", async () => {
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

    it("Cannot create document when request is not contain businass_date", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          hoge: "hoge",
          published_datetime: new Date(),
          is_pause: true
        })
      );
    });

    it("Cannot create document when request is not contain published_datetime", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          business_date: new Date(),
          hoge: "hoge",
          is_pause: true
        })
      );
    });

    it("Cannot create document when business_date is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          business_date: new Date(),
          published_datetime: new Date(),
          hoge: "hoge"
        })
      );
    });

    it("Cannot create document when business_date is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          business_date: null,
          published_datetime: new Date(),
          is_pause: true
        })
      );
    });

    it("Cannot create document when is_pause is null", async () => {
      const doc = getCollection().doc();
      await firebase.assertFails(
        doc.set({
          business_date: new Date(),
          published_datetime: new Date(),
          is_pause: null
        })
      );
    });
  });

  describe("Update security rule tests", () => {
    const docId = "test_business_day";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      });
    });

    it("Can update document", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(
        doc.update({
          business_date: new Date(),
          published_datetime: new Date(),
          is_pause: false
        })
      );
    });

    it("Cannot update document", async () => {
      const doc = getCollection().doc("not_exist_business_day");
      await firebase.assertFails(
        doc.update({
          business_date: new Date(),
          published_datetime: new Date(),
          is_pause: false
        })
      );
    });
  });

  describe("Delete security rule tests", () => {
    const docId = "test_business_day";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      });
    });

    it("Can delete document by id", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(doc.delete());
    });
  });

  describe("Get security rule tests", () => {
    const docId = "test_business_day";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);
      await doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      });
    });

    it("Can read document by id", async () => {
      const doc = getCollection().doc(docId);
      await firebase.assertSucceeds(doc.get());
    });

    it("Cannot read document by id when document is not exist", async () => {
      const doc = getCollection().doc("not_exist_business_day");
      const promise = await doc.get();
      expect(promise.exists).toBeFalsy();
    });
  });

  describe("List security rule tests", () => {
    it("read items in the business days", async () => {
      const businessDays = getCollection();
      await firebase.assertSucceeds(businessDays.get());
    });
  });

  describe("Timezone in the business day security rule tests", () => {
    const docId = "test_business_day";

    beforeEach(async () => {
      const doc = getCollection().doc(docId);

      await doc.set({
        business_date: new Date(),
        published_datetime: new Date(),
        is_pause: true
      });
    });

    describe("Create security rule tests", () => {
      it("Can create document", async () => {
        const doc = getCollection().doc(docId);
        const subDoc = doc.collection("timezones").doc();

        await firebase.assertSucceeds(
          subDoc.set({
            start_time: new Date(),
            end_time: new Date(),
            selected: true
          })
        );
      });

      it("Cannot create document when request size less than 3", async () => {
        const doc = getCollection().doc(docId);
        const subDoc = doc.collection("timezones").doc();

        await firebase.assertFails(
          subDoc.set({
            start_time: new Date(),
            end_time: new Date()
          })
        );
      });

      it("Cannot create document when request size more than 3", async () => {
        const doc = getCollection().doc(docId);
        const subDoc = doc.collection("timezones").doc();

        await firebase.assertFails(
          subDoc.set({
            start_time: new Date(),
            end_time: new Date(),
            selected: true,
            hoge: "hoge"
          })
        );
      });

      it("Cannot create doeument when start_time is null", async () => {
        const doc = getCollection().doc(docId);
        const subDoc = doc.collection("timezones").doc();

        await firebase.assertFails(
          subDoc.set({
            start_time: null,
            end_time: new Date(),
            selected: true
          })
        );
      });

      it("Cannot create document when end_time is null", async () => {
        const doc = getCollection().doc(docId);
        const subDoc = doc.collection("timezones").doc();

        await firebase.assertFails(
          subDoc.set({
            start_time: new Date(),
            end_time: null,
            selected: true
          })
        );
      });

      it("Cannot create document when end_time is null", async () => {
        const doc = getCollection().doc(docId);
        const subDoc = doc.collection("timezones").doc();

        await firebase.assertFails(
          subDoc.set({
            start_time: new Date(),
            end_time: new Date(),
            selected: null
          })
        );
      });
    });

    describe("Update security tests", () => {
      const subDocId = "test_timezone";

      beforeEach(async () => {
        const doc = getCollection().doc(docId);
        const subdoc = doc.collection("timezones").doc(subDocId);

        await subdoc.set({
          start_time: new Date(),
          end_time: new Date(),
          selected: true
        });
      });

      it("Can update document", async () => {
        const doc = getCollection().doc(docId).collection("timezones").doc(subDocId);
        await firebase.assertSucceeds(
          doc.update({
            start_time: new Date(),
            end_time: new Date(),
            selected: true
          })
        );
      });

      it("Cannot update document", async () => {
        const doc = getCollection().doc().collection("timezones").doc();
        await firebase.assertFails(
          doc.update({
            start_time: new Date(),
            end_time: new Date(),
            selected: true
          })
        );
      });
    });

    describe("Delete security tests", () => {
      const subDocId = "test_timezone";

      beforeEach(async () => {
        const doc = getCollection().doc(docId);
        const subdoc = doc.collection("timezones").doc(subDocId);

        await subdoc.set({
          start_time: new Date(),
          end_time: new Date(),
          selected: true
        });
      });

      it("Can delete document by id", async () => {
        const doc = getCollection().doc(docId).collection("timezones").doc(subDocId);
        await firebase.assertSucceeds(doc.delete());
      });
    });

    describe("Get security rule tests", () => {
      const subDocId = "test_timezone";

      beforeEach(async () => {
        const doc = getCollection().doc(docId);
        const subdoc = doc.collection("timezones").doc(subDocId);

        await subdoc.set({
          start_time: new Date(),
          end_time: new Date(),
          selected: true
        });
      });

      it("Can read document by id", async () => {
        const doc = getCollection().doc(docId).collection("timezones").doc(subDocId);
        await firebase.assertSucceeds(doc.get());
      });

      it("Cannot read timezones by id when document is not exist", async () => {
        const doc = getCollection().doc(docId).collection("timezones").doc("not_exist_timezone");
        const promise = await doc.get();
        expect(promise.exists).toBeFalsy();
      });
    });
  });
});
