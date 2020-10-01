// entity
import { EMAIL_MESSAGE_TEMPLATES, Email } from "@/entity/email";
import { Reservation } from "@/entity/reservation";

// plugin
import firebase from "@/plugins/firebase";

const setReservationCreatedMessage = (model: Reservation, redirectUrl: string): string => {
  const message = `${model.reserver_name} 様

Cafe de GAMOYONです
ご予約ありがとうございます！
ご来店お待ちしております

ご予約確定後もメモ欄に追加入力可能です
スペシャルデザートのオーダー、内容変更は来店1週間前までにメモ欄までお願いします

当日のご連絡はインスタ、Facebookへメッセージをお願いします

ご連絡なく10分以上遅れられますと、キャンセルになりますのでご注意ください

ご予約の確認、変更、キャンセルはこちら
${redirectUrl}

Cafe de GAMOYON
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/
    `;

  return message;
};

const setReservationEditedMessage = (model: Reservation, redirectUrl: string): string => {
  const message = `${model.reserver_name} 様

Cafe de GAMOYONです
ご予約の変更承りました
スペシャルデザートのオーダー、内容変更は来店1週間前までにメモ欄までお願いします

ご予約の確認、変更、キャンセルはこちら
${redirectUrl}

Cafe de GAMOYON
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/
    `;

  return message;
};

const setReservationCanceledMessage = (model: Reservation, redirectUrl: string): string => {
  const message = `${model.reserver_name} 様

Cafe de GAMOYONです
予約のキャンセルを承りました

またのご予約をお待ちしております

再予約はこちらから
${redirectUrl}

Cafe de GAMOYON
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/
    `;

  return message;
};

/**
 * メール配信メッセージセット
 * @param reservation
 * @param reservationId
 * @param redirectUrl
 * @param type
 * @returns Email
 */
export const sendEmail = async (
  reservation: Reservation,
  reservationId: string,
  redirectUrl: string,
  type: EMAIL_MESSAGE_TEMPLATES
) => {
  let subject = "";
  let message = "";

  switch (type) {
    case EMAIL_MESSAGE_TEMPLATES.CREATED:
      subject = "[Cafe de GAMOYON] 予約完了のお知らせ";
      message = setReservationCreatedMessage(reservation, redirectUrl);
      break;
    case EMAIL_MESSAGE_TEMPLATES.EDITED:
      subject = "[Cafe de GAMOYON] 予約変更完了のお知らせ";
      message = setReservationEditedMessage(reservation, redirectUrl);
      break;
    case EMAIL_MESSAGE_TEMPLATES.CANCELED:
      subject = "[Cafe de GAMOYON] 予約キャンセル完了のお知らせ";
      message = setReservationCanceledMessage(reservation, redirectUrl);
      break;
    default:
      // do nothing
      break;
  }

  const email: Email = {
    destination: reservation.mail,
    subject: subject,
    message: message,
    reservation_id: reservationId,
    reserver_name: reservation.reserver_name
  };
  const sendMail = firebase.functions().httpsCallable("sendMail");

  return await sendMail(email)
    .then(res => console.log(res))
    .catch(error => console.error(error));
};
