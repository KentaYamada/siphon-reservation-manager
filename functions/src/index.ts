import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import {
  getNewYearDishesReservedMessage,
  getNewYearDishesEditedMessage,
  getNewYearDishesCanceledMessage
} from "./email-message";
import { NewYearDishesSetting } from "./entity/new-year-dishes-setting";

import { onCreateReservation } from "./firestore-triggers/reservation/create-reservation";
import { onUpdateReservation } from "./firestore-triggers/reservation/update-reservation";
import { onDeleteReservation } from "./firestore-triggers/reservation/delete-reservation";
import { onCreateMailTransmissionLog } from "./firestore-triggers/mail-transmission-log/create-mail-transmission-log";

admin.initializeApp();

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

exports.onCreateReservation = onCreateReservation;
exports.onDeleteReservation = onDeleteReservation;
exports.onUpdateReservation = onUpdateReservation;
exports.onCreateMailTransmissionLog = onCreateMailTransmissionLog;

exports.onCreateNewYearDishesReservation = functions.firestore
  .document("new_year_dishes_reservations/{id}")
  .onCreate(async snap => {
    const promise$ = await admin.firestore().collection("new_year_dishes_settings").doc("1").get();
    const setting: NewYearDishesSetting = {
      delivery_date: promise$.data()?.delivery_date.toDate(),
      delivery_time_from: promise$.data()?.delivery_time_from.toDate(),
      delivery_time_to: promise$.data()?.delivery_time_to.toDate()
    };
    const data = snap.data();
    const message = getNewYearDishesReservedMessage(data?.reserver_name, data?.detail_url, setting);
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
    const promise$ = await admin.firestore().collection("new_year_dishes_settings").doc("1").get();
    const setting: NewYearDishesSetting = {
      delivery_date: promise$.data()?.delivery_date.toDate(),
      delivery_time_from: promise$.data()?.delivery_time_from.toDate(),
      delivery_time_to: promise$.data()?.delivery_time_to.toDate()
    };
    const data = snap.after.data();
    const message = getNewYearDishesEditedMessage(data?.reserver_name, data?.detail_url, setting);
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
