// import * as moment from "moment";
import moment from "moment";

/**
 * 日付データをYYYY年MM月DD日に変換
 * @param value
 * @returns string
 */
export const formatDateJp = (value: Date): string => {
  return moment(value).format("YYYY年MM月DD日");
};
