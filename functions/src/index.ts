// import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as corsLib from "cors";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// admin.initializeApp();

const cors = corsLib({ origin: true });
const mailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "knt.yamada.800@gmail.com",
    pass: "pg800geek"
  }
});

exports.sendMail = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const message = {
      from: "Cafe de Gamoyon <knt.yamada.800@gmail.com>",
      to: "kntx.fullspeed.428@gmail.com",
      subject: "Cafe de Gamoyon 予約メールテスト",
      text: "テストメッセージ"
    };

    return mailTransport
      .sendMail(message)
      .then(res => console.log(res))
      .catch(error => console.error(error));
  });
});
