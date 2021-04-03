import * as functions from "firebase-functions";
import { MailTransmissionLogService } from "../../firestore-service/mail-transmission-log-service";
import { MailTransmissionLog } from "../../entity/mail-transmission-log";
import { getDateTimeNow } from "../../service/date-time-helper";
import { MailMessage } from "../../entity/mail-message";
import { GmailService } from "../../service/gmail-service";

const getUrl = (redirectUrl: string): string => {
  const url = new URL(redirectUrl);
  const origin = url.origin;

  return origin;
};

const getMessage = (reserverName: string, redirectUrl: string): MailMessage => {
  const text = `${reserverName} 様

Cafe de Gamoyonです
ご予約のキャンセル承りました

またのご予約をお待ちしております

再予約はこちらから

${redirectUrl}

Cafe de Gamoyon
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/
  `;
  const data: MailMessage = {
    subject: "[Cafe de Gamoyon] 予約キャンセル完了のお知らせ",
    text: text
  };

  return data;
};

/**
 * Trigger delete reservation document
 */
export const onDeleteReservation = functions.firestore.document("reservations/{id}").onDelete(snap => {
  const redirectUrl = getUrl(snap.data().redirect_url);
  const mailMessage: MailMessage = getMessage(snap.data().reserver_name, redirectUrl);
  const mailOptions = GmailService.getMailOptions(snap.data().mail, mailMessage);
  const nowDateTime = getDateTimeNow();
  const data: MailTransmissionLog = {
    send_datetime: nowDateTime,
    reserver_name: snap.data().reserver_name,
    mail: snap.data().mail,
    redirect_url: redirectUrl,
    type: "cancel_reservation",
    type_name: "予約取消",
    result: "",
    created_at: nowDateTime
  };

  console.log("予約者(種別): %s(%s)", data.reserver_name, data.type_name);
  console.log("メールアドレス: %s", data.mail);

  return GmailService.send(mailOptions)
    .then(() => (data.result = "ok"))
    .catch(() => (data.result = "error"))
    .finally(() => MailTransmissionLogService.add(data));
});
