/**
 * Convert newline to br tag
 *
 * @param value
 * @returns string
 */
export const nl2br = (value: string) => {
  return value.replace(/\r\n/g, "<br>").replace(/(\n|\r)/g, "<br>");
};
