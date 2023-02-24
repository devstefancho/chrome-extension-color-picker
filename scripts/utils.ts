// const hexaCode = "#4285f4";
const RGBToHSL = (hexaCode: string) => {
  const [_, r, g, b] =
    /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/g
      ?.exec(hexaCode)
      ?.map((hexa) => parseInt(hexa, 16) / 255) || [];

  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ].map((code) => Math.round(code));
};

const util = {
  RGBToHSL,
};

export default util;
