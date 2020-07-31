import { tel } from "@/plugins/validate";

/**
 * Custom validation rules test
 */
describe("validate", () => {
  it.each(["0612345678", "09012345678", "01201234567"])("tel rule test", (value: string) => {
    expect(tel(value)).toBeTruthy();
  });

  it.each(["", "abc"])("test tel when passed invalid value", (value: string) => {
    expect(tel(value)).toBeFalsy();
  });
});
