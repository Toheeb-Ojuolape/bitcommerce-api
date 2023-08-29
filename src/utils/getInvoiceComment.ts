import { PurchaseRequest } from "../interfaces/PurchaseRequest";
import { getProductNames } from "./productName";

export const getInvoiceComment = (payload: PurchaseRequest) => {
  return `"Purchase of ${getProductNames(payload.products)} by ${
    payload.name
  }, Email: ${payload.email}, Delivery address: ${payload.address}"`;
};
