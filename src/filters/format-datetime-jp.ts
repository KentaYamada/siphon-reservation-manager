import moment from "moment";

export const formatDateTimeJp = (value: Date | null): string => {
  return value ? moment(value).format("YYYY年MM月DD日 hh:mm:ss") : "";
};
