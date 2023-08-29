import { Product } from "../interfaces/ProductInterface";
const data: Array<Product> = require("../../data.json");

export const getProductNames = (products: Array<number>): string => {
  let productNames = "";
  products.forEach((product) => {
    productNames += data.filter((item) => (item.id == product))[0].title + ", ";
  });
  return productNames;
};
