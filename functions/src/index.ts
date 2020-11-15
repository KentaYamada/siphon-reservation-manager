import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as corsLib from "cors";

const cors = corsLib({ origin: true });
const config = functions.config();

const mailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.gmail.email,
    pass: config.gmail.password
  }
});

const getNewYearDishesReservedMessage = (reserverName: string): string => {
  return `${reserverName} 様
Cafe de Gamoyonです
スイーツおせちのご予約ありがとうございます！

おせちの数量変更または、キャンセルの際は、このメールへご返信ください

Cafe de Gamoyon
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/
    `;
};

exports.sendMail = functions.https.onRequest((request, response: functions.Response) => {
  return cors(request, response, () => {
    const message = {
      from: `Cafe de Gamoyon <${config.gmail.email}>`,
      to: request.body.data.destination,
      bcc: config.gmail.email,
      subject: request.body.data.subject,
      text: request.body.data.message
    };

    console.log(request.body);
    console.log(message);

    return mailTransport
      .sendMail(message)
      .then(res => {
        console.log(res);
        return response.status(200).json({ message: "Send email" });
      })
      .catch(error => {
        console.error(error);
        return response.status(500).json({ message: "Failed send email" });
      });
  });
});

exports.onCreateNewYearDishesReservation = functions.firestore
  .document("new_year_dishes_reservations/{id}")
  .onCreate(snap => {
    const data = snap.data();
    const message = getNewYearDishesReservedMessage(data.reserver_name);
    const sendData = {
      from: `Cafe de Gamoyon <${config.gmail.email}>`,
      to: data.mail,
      bcc: config.gmail.email,
      subject: "[Cafe de Gamoyon] スイーツおせち予約完了のお知らせ",
      text: message
    };

    console.log(sendData);

    return mailTransport.sendMail(sendData)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  });
