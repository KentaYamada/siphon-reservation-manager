import moment from "moment";

/**
 * 予約日時のフォーマット
 *
 * @param reservationDate
 * @param startTime
 * @param endTime
 * @returns string
 */
export const formatReservationDatetime = (
  reservationDate: Date,
  startTime: Date,
  endTime: Date
): string => {
  const hasValue = reservationDate && startTime && endTime;
  let formatDateTime = "";

  if (hasValue) {
    const formatDate = moment(reservationDate).format("YYYY年MM月DD日");
    const formatStartTime = moment(startTime).format("HH:mm");
    const formatendTime = moment(endTime).format("HH:mm");
    formatDateTime = `${formatDate} ${formatStartTime}-${formatendTime}`;
  }

  return formatDateTime;
};
