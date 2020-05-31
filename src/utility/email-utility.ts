// entity
import { EMAIL_MESSAGE_TEMPLATES, Email } from "@/entity/email";
import { Reservation } from "@/entity/reservation";

// plugin
import firebase from "@/plugins/firebase";

const setReservationCreatedMessage = (
  model: Reservation,
  redirectUrl: string
): string => {
  const message = `${model.reserver_name} 様

こんにちは。Cafe de GAMOYONです。
ご予約承りました。当日のご来店お待ちしております！

ご予約の確認、変更、キャンセルはこちら
${redirectUrl}

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/
    `;

  return message;
};

const setReservationEditedMessage = (
  model: Reservation,
  redirectUrl: string
): string => {
  const message = `${model.reserver_name} 様

こんにちは。Cafe de GAMOYONです。
ご予約の変更承りました。

ご予約の確認、変更、キャンセルはこちら
${redirectUrl}

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/
    `;

  return message;
};

const setReservationCanceledMessage = (
  model: Reservation,
  redirectUrl: string
): string => {
  const message = `${model.reserver_name} 様

こんにちは。Cafe de GAMOYONです。
予約のキャンセルを承りました。またのご予約をお待ちしております。

再予約はこちらから
${redirectUrl}

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
