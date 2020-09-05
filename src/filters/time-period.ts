import moment from "moment";
import _ from "lodash";

/**
 * Format time period
 *
 * @param startTime
 * @param endTime
 * @returns string
 */
export const timePeriod = (startTime: Date, endTime: Date): string => {
  let text = "";

  if (_.isNil(startTime) || _.isNil(endTime)) {
    return text;
  }

  text = `${moment(startTime).format("HH:mm")} - ${moment(endTime).format("HH:mm")}`;

  return text;
};
