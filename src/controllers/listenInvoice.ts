import { Invoice } from "@getalby/lightning-tools";
import { Request, Response } from "express";

export const listenInvoice = async (req: Request, res: Response) => {
  try {
    console.log("ah")
    console.log(req.body)
    const { paymentRequest, preimage } = req.body.invoice;
    console.log(paymentRequest)
    const invoice = new Invoice({
      pr: paymentRequest,
      preimage: preimage,
    });
    const status = await invoice.validatePreimage(preimage);
    console.log(status)
    res.status(200).json({
      status: status,
    });
  } catch (error) {
    res.status(400).json({
        error:"Error occured while verifying payment"
    })
  }
};
