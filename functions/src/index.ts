import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as corsLib from "cors";
import {
  getNewYearDishesReservedMessage, 
  getNewYearDishesEditedMessage,
  getNewYearDishesCanceledMessage 
} from "./email-message";
import { NewYearDishesSetting } from "./entity/new-year-dishes-setting";

admin.initializeApp();

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
  .onCreate(async snap => {
    const promise$ = await admin.firestore().collection("new_year_dishes_setting").doc("1").get();
    const setting = {
      delivery_date: promise$.data()?.delivery_date.toDate(),
      delivery_time_from: promise$.data()?.delivery_time_from.toDate(),
      delivery_time_to: promise$.data()?.delivery_time_to.toDate(),
    } as NewYearDishesSetting;
    const data = snap.data();
    const message = getNewYearDishesReservedMessage(data?.reserver_name, setting);
    const sendData = {
      from: `Cafe de Gamoyon <${config.gmail.email}>`,
      to: data?.mail,
      bcc: config.gmail.email,
      subject: "[Cafe de Gamoyon] 新春スイーツ予約完了のお知らせ",
      text: message
    };

    console.log(sendData);

    return mailTransport
      .sendMail(sendData)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  });

exports.onUpdateNewYearDishesReservation = functions.firestore
  .document("new_year_dishes_reservations/{id}")
  .onUpdate(async snap => {
    const promise$ = await admin.firestore().collection("new_year_dishes_setting").doc("1").get();
    const setting = {
      delivery_date: promise$.data()?.delivery_date.toDate(),
      delivery_time_from: promise$.data()?.delivery_time_from.toDate(),
      delivery_time_to: promise$.data()?.delivery_time_to.toDate(),
    } as NewYearDishesSetting;
    const data = snap.after.data();
    const message = getNewYearDishesEditedMessage(data?.reserver_name, setting);
    const sendData = {
      from: `Cafe de Gamoyon <${config.gmail.email}>`,
      to: data?.mail,
      bcc: config.gmail.email,
      subject: "[Cafe de Gamoyon] 新春スイーツ予約変更完了のお知らせ",
      text: message
    };

    console.log(sendData);

    return mailTransport
      .sendMail(sendData)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  });

exports.onDeleteNewYearDishesReservation = functions.firestore
  .document("new_year_dishes_reservations/{id}")
  .onDelete(snap => {
    const data = snap.data();
    const message = getNewYearDishesCanceledMessage(data?.reserver_name);
    const sendData = {
      from: `Cafe de Gamoyon <${config.gmail.email}>`,
      to: data?.mail,
      bcc: config.gmail.email,
      subject: "[Cafe de Gamoyon] 新春スイーツ予約キャンセル完了のお知らせ",
      text: message
    };

    console.log(sendData);

    return mailTransport
      .sendMail(sendData)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  });
