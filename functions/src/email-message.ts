import * as moment from "moment";
import { NewYearDishesSetting } from "./entity/new-year-dishes-setting";
import { MailMessage } from "./entity/mail-message";
import { MailTransmissionLog } from "./entity/mail-transmission-log";

export const getNewYearDishesReservedMessage = (
  reserverName: string,
  redirectUrl: string,
  setting: NewYearDishesSetting
): string => {
  const deliveryDate = moment(setting.delivery_date).add(9, "hours").format("YYYY年MM月DD日");
  const deliveryTimeFrom = moment(setting.delivery_time_from).add(9, "hours").format("HH:mm");
  const deliveryTimeTo = moment(setting.delivery_time_to).add(9, "hours").format("HH:mm");

  return `${reserverName} 様
Cafe de Gamoyonです
新春スイーツのご予約ありがとうございます！

受渡日は、${deliveryDate} ${deliveryTimeFrom}〜${deliveryTimeTo}となります
当店までご来店お願いいたします

「数量変更、キャンセルについて」
2020年12月15日(火)までWebのみで操作可
※ キャンセル料なし

2020年12月16日(水)以降の変更、キャンセルなどのご相談はこのメールにご返信ください
※ キャンセル料は全額お客様負担となります

数量変更は予定数に達していた場合、変更できない事があります

ご予約の確認、変更、キャンセルはこちら
${redirectUrl}

Cafe de Gamoyon
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/`;
};

export const getNewYearDishesEditedMessage = (
  reserverName: string,
  redirectUrl: string,
  setting: NewYearDishesSetting
): string => {
  const deliveryDate = moment(setting.delivery_date).add(9, "hours").format("YYYY年MM月DD日");
  const deliveryTimeFrom = moment(setting.delivery_time_from).add(9, "hours").format("hh:mm");
  const deliveryTimeTo = moment(setting.delivery_time_to).add(9, "hours").format("hh:mm");

  return `${reserverName} 様
Cafe de Gamoyonです
新春スイーツのご予約変更承りました

受渡日は、${deliveryDate} ${deliveryTimeFrom}〜${deliveryTimeTo}となります
当店までご来店お願いいたします

「数量変更、キャンセルについて」
2020年12月15日(火)までWebのみで操作可
※ キャンセル料なし

2020年12月16日(水)以降の変更、キャンセルなどのご相談はこのメールご返信にください
※ キャンセル料は全額お客様負担となります

数量変更は予定数に達していた場合、変更できない事があります

ご予約の確認、変更、キャンセルはこちら
${redirectUrl}

Cafe de Gamoyon
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/`;
};

export const getNewYearDishesCanceledMessage = (reserverName: string): string => {
  return `${reserverName}様
Cafe de Gamoyonです
新春スイーツのご予約キャンセル承りました

またのご利用をおまちしております

Cafe de Gamoyon
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/`;
};

export const getReservedMessage = (payload: MailTransmissionLog): MailMessage => {
  const text = `${payload.reserver_name} 様

Cafe de Gamoyonです
ご予約ありがとうございます！
ご来店お待ちしております

ご予約確定後もメモ欄に追加入力可能です
スペシャルデザートのオーダー、内容変更は来店1週間前までにメモ欄までお願いします

当日のご連絡はInstagram、Facebookへメッセージをお願いします

ご連絡なく10分以上遅れられますと、キャンセルになりますのでご注意ください

ご予約の確認、変更、キャンセルはこちら
オーダー、人数追加は1週間前まで
キャンセルはご来店2日前までとなります

${payload.redirect_url}

Cafe de Gamoyon
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/
  `;
  const data: MailMessage = {
    subject: "[Cafe de Gamoyon] 予約完了のお知らせ",
    text: text
  };

  return data;
};

export const getReservationEditedMessage = (payload: MailTransmissionLog): MailMessage => {
  const text = `${payload.reserver_name} 様

Cafe de Gamoyonです
ご予約の変更承りました
スペシャルデザートのオーダー、内容変更は来店1週間前までにメモ欄までお願いします

ご予約の確認、変更、キャンセルはこちら
オーダー、人数追加は1週間前まで
キャンセルはご来店2日前までとなります

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

export const getReservationCanceledMessage = (payload: MailTransmissionLog): MailMessage => {
  const text = `${payload.reserver_name} 様

Cafe de Gamoyonです
ご予約のキャンセル承りました

またのご予約をお待ちしております

再予約はこちらから

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
