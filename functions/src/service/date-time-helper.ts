import * as moment from "moment";

/**
 * Get now date time JST
 *
 * @returns Date
 */
export const getDateTimeNow = (): Date => {
  return moment().add(9, "hours").toDate();
};
