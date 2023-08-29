const { getProductNames } = require("./productName");

module.exports.getInvoiceComment = (payload) => {
  return `"Purchase of ${getProductNames(payload.products)} by ${
    payload.name
  }, Email: ${payload.email}, Delivery address: ${payload.address}"`;
};
