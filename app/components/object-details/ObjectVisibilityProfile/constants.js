export const DEFAULT_MONTH = 1;
export const DEFAULT_DAY = 1;
export const DEFAULT_YEAR = 2018;
export const DEFAULT_OBSID = 'chile';
const START_YEAR = 2004;
const END_YEAR = new Date().getFullYear() + 1;

export const MONTHS = [
  { name: 'Jan', value: 1 },
  { name: 'Feb', value: 2 },
  { name: 'March', value: 3 },
  { name: 'April', value: 4 },
  { name: 'May', value: 5 },
  { name: 'June', value: 6 },
  { name: 'July', value: 7 },
  { name: 'Aug', value: 8 },
  { name: 'Sept', value: 9 },
  { name: 'Oct', value: 10 },
  { name: 'Nov', value: 11 },
  { name: 'Dec', value: 12 },
];

// create and publish a range of year like values
export const YEARS = [];
for (let i = START_YEAR; i <= END_YEAR; i += 1) {
  YEARS.push({
    name: i,
    value: i,
  });
}
