const data = require("../../data.json");

module.exports.sumAmount = (products) => {
  let sum = 0;
  products.forEach((product) => {
    sum += data.filter((item) => item.id == product)[0].price;
  });
  return sum;
};
