import { Request, Response } from "express";
import { LightningAddress } from "@getalby/lightning-tools";
import { Invoice } from "@getalby/lightning-tools";
import { listenInvoice } from "../helpers/listenInvoice";

if (!process.env.MERCHANT_LN_ADDRESS) {
  throw new Error(
    "Merchant's Lightning address environment variable is not defined"
  );
}

const ln = new LightningAddress(process.env.MERCHANT_LN_ADDRESS);

export const generateInvoice = async (req: Request, res: Response) => {
  try {
    if (!req.body.amount) {
      return res.status(400).json({
        error: "Please specify your invoice amount",
      });
    }
    await ln.fetch();
    // get the LNURL-pay data:
    const invoice: Invoice = await ln.requestInvoice({
      satoshi: req.body.amount,
    });

    listenInvoice(invoice,res)

    return res.status(200).json({
      invoice: invoice,
    });
  } catch (error) {
    res.status(400).json({
      error: "Error encountered while generating invoice",
    });
  }
};
