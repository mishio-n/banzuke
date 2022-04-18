import { getFrameNumber } from "~/logic/getFrameColor";

describe("getFrameNumber", () => {
  test("8頭以下", () => {
    expect(getFrameNumber(1, 1)).toBe(1);
    expect(getFrameNumber(8, 8)).toBe(8);
  });

  test("9頭以上、16頭以下", () => {
    expect(getFrameNumber(9, 9)).toBe(8);
    expect(getFrameNumber(6, 12)).toBe(5);
    expect(getFrameNumber(16, 16)).toBe(8);
  });
  test("17頭", () => {
    expect(getFrameNumber(15, 17)).toBe(8);
    expect(getFrameNumber(17, 17)).toBe(8);
  });
  test("18頭", () => {
    expect(getFrameNumber(13, 18)).toBe(7);
    expect(getFrameNumber(14, 18)).toBe(7);
    expect(getFrameNumber(15, 18)).toBe(7);
    expect(getFrameNumber(16, 18)).toBe(8);
    expect(getFrameNumber(17, 18)).toBe(8);
    expect(getFrameNumber(18, 18)).toBe(8);
  });
});
