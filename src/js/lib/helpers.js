// const addNums = (num1, num2) => {
//   return num1 + num2;
// };
// function addNums(num1, num2) {
//   return num1 + num2;
// }

// function minusNums(num1, num2) {
//   return num1 - num2;
// }

const numberToCurrency = num => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  return formatter.format(num);
};

export default {
  numberToCurrency
};
