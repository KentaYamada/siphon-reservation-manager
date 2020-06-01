/**
 * Validate telephone format
 * @param: value
 * @return boolean
 */
export const tel = (value: string): boolean => {
  const pattern = /^0\d{1,4}-\d{1,4}-\d{3,4}$/;
  const re = new RegExp(pattern);

  return re.test(value);
};
