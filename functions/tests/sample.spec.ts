const firebase = require("@firebase/testing");
const fs = require("fs");

const PROJECT_ID = "siphon-reservation-manager-dev";
// const getAuthedDb = () => {
// };

describe("Cloud functions tests", () => {
  // beforeAll(async () => {
  //   await firebase.loadFirestoreRules({
  //     projectId: PROJECT_ID,
  //     rules: fs.readFileSync("../../firestore.rules", "utf8")
  //   });
  // });

  // afterEach(async () => {
  //   await firebase.clearFirestoreData({ projectId: PROJECT_ID });
  // });

  // afterAll(async () => {
  //   await Promise.all(firebase.apps().map(app => app.delete()));
  // });

  describe("Sample tests", () => {
    it("test hoge", () => {
      expect(1 + 2).toBe(3);
    });
  });
});
