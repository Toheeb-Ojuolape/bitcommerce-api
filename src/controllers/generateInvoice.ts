import { Request, Response } from "express";
import { LightningAddress, Invoice } from "@getalby/lightning-tools";
import { listenInvoice } from "../helpers/listenInvoice";
import { sumAmount } from "../utils/sumAmount";
import { PurchaseRequest } from "../interfaces/PurchaseRequest";
import { getInvoiceComment } from "../utils/getInvoiceComment";

if (!process.env.MERCHANT_LN_ADDRESS) {
  throw new Error(
    "Merchant's Lightning address environment variable is not defined"
  );
}

const ln = new LightningAddress(process.env.MERCHANT_LN_ADDRESS);

export const generateInvoice = async (req: Request, res: Response) => {
  const { name, email, products } = req.body as PurchaseRequest;
  try {
    if (products.length == 0) {
      return res.status(400).json({
        error: "Please select products to purchase",
      });
    }
    await ln.fetch();
    // get the LNURL-pay data:
    const invoice: Invoice = await ln.requestInvoice({
      satoshi: sumAmount(products),
      comment: getInvoiceComment(req.body),
      payerdata: {
        name: name,
        email: email,
      },
    });

    listenInvoice(req, invoice, res);

    return res.status(200).json({
      invoice: invoice,
    });
  } catch (error) {
    res.status(400).json({
      error: "Error encountered while generating invoice",
    });
  }
};
