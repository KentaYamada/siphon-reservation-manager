import _ from "lodash";

/**
 * Format reserver name with number of reservations
 * @param reserverName
 * @param numberOfPeople
 * @returns string
 */
export const reserverNameWithNumberOfPeople = (reserverName: string, numberOfPeople: number): string => {
  if (_.isEmpty(reserverName) || _.isNil(numberOfPeople)) {
    return "";
  }

  return `${reserverName}様 (${numberOfPeople}名)`;
};
