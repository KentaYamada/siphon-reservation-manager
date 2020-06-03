/**
 * Validate telephone format
 * @param: value
 * @return boolean
 */
export const tel = (value: string): boolean => {
  const pattern = /^(0{1}\d{9,10})$/;
  const re = new RegExp(pattern);

  return re.test(value);
};
