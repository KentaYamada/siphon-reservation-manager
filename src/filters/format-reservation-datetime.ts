import moment from "moment";

/**
 * 予約日時のフォーマット
 *
 * @param reservationDate
 * @param reservationTimezone
 * @returns string
 */
export const formatReservationDatetime = (
  reservationDate: Date,
  reservationTimezone: string
): string => {
  if (!reservationDate || !reservationTimezone) {
    return "";
  }

  const formatDate = moment(reservationDate).format("YYYY年MM月DD日");
  return `${formatDate} ${reservationTimezone}`;
};
