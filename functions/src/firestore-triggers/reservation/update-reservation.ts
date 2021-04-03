import * as functions from "firebase-functions";
import { MailTransmissionLogService } from "../../firestore-service/mail-transmission-log-service";
import { MailMessage } from "../../entity/mail-message";
import { MailTransmissionLog } from "../../entity/mail-transmission-log";
import { getDateTimeNow } from "../../service/date-time-helper";
import { GmailService } from "../../service/gmail-service";

const getMessage = (reserverName: string, redirectUrl: string): MailMessage => {
  const text = `${reserverName} 様

Cafe de Gamoyonです
ご予約の変更承りました
スペシャルデザートのオーダー、内容変更は来店1週間前までにメモ欄までお願いします

ご予約の確認、変更、キャンセルはこちら
オーダー、人数追加は1週間前まで
キャンセルはご来店2日前までとなります

${redirectUrl}

Cafe de Gamoyon
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/
  `;
  const data: MailMessage = {
    subject: "[Cafe de Gamoyon] 予約変更完了のお知らせ",
    text: text
  };

  return data;
};

/**
 * Trigger update reservation document
 */
export const onUpdateReservation = functions.firestore.document("reservations/{id}").onUpdate(snap => {
  const mailMessage: MailMessage = getMessage(snap.after.data().reserver_name, snap.after.data().redirect_url);
  const mailOptions = GmailService.getMailOptions(snap.after.data().mail, mailMessage);
  const nowDateTime = getDateTimeNow();
  const data: MailTransmissionLog = {
    send_datetime: nowDateTime,
    reserver_name: snap.after.data().reserver_name,
    mail: snap.after.data().mail,
    redirect_url: snap.after.data().redirect_url,
    type: "edit_reservation",
    type_name: "予約変更",
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
