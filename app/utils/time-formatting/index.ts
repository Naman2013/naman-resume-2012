export const twoDigitsTimeFormatting = (val: number): string => {
  const newVal = val.toString();
  return newVal.length > 1 ? newVal : `0${newVal}`;
};
