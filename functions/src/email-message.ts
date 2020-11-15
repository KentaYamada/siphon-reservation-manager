import * as moment from "moment";
import { NewYearDishesSetting } from "./entity/new-year-dishes-setting";


export const getNewYearDishesReservedMessage = (reserverName: string, setting: NewYearDishesSetting): string => {
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

Cafe de Gamoyon
大阪府大阪市城東区今福東2-9-19
https://goo.gl/maps/X2NpTBBGJBamfPgw6

最新情報をSNSでチェック！
Instagram: https://www.instagram.com/cafedegamoyon/?hl=ja
Facebook: https://www.facebook.com/gamoyon4204/`;
};

export const getNewYearDishesEditedMessage = (reserverName: string, setting: NewYearDishesSetting): string => {
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
