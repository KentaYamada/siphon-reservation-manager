/**
 * 予約者名と予約人数をフォーマット
 *
 * @param reserverName
 * @param numberOfReservations
 * @returns string
 */
export const formatReserver = (reserverName: string, numberOfReservations: number): string => {
  if (!reserverName || !numberOfReservations) {
    return "";
  }

  return `${reserverName} (${numberOfReservations}名)`;
};
