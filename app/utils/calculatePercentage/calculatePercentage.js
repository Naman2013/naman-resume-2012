import convertToDecimal from '../convertToDecimal';

export default function calculatePercentage(number = 0, percent = 0) {
  const convertedPercent = convertToDecimal(percent);
  console.log(number, convertedPercent);
  return (number * convertedPercent);
}
