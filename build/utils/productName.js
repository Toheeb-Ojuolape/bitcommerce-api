
const data = require("../../data.json");

module.exports.getProductNames = (products) => {
  let productNames = "";
  products.forEach((product) => {
    productNames += data.filter((item) => (item.id == product))[0].title + ", ";
  });
  return productNames;
};
