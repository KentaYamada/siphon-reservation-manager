import moment from "moment";
import { isNil } from "lodash";

export const getFixedDate = (value: Date): Date | null => {
  if (isNil(value)) {
     return null; 
  }

  return moment(value).set({ year: 2020, month: 0, date: 1}).toDate();
}