/**
 * 予約日時のフォーマット
 *
 * @param reservationDate
 * @param reservationTimezone
 * @returns string
 */
export const formatReservationDatetime = (
  reservationDate: string,
  reservationTimezone: string
): string => {
  if (!reservationDate || !reservationTimezone) {
    return "";
  }

  return `${reservationDate} ${reservationTimezone}`;
};
