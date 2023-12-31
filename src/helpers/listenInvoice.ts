import { Invoice } from "@getalby/lightning-tools";
import { Request,Response } from "express";
import { io } from "../app";
import sendNotification from "./email";
import { PurchaseRequest } from "../interfaces/PurchaseRequest";


export const listenInvoice = async (
  req:Request,
  invoice: Invoice,
  res: Response
) => {
  try {
    const intervalId = setInterval(async () => {
      const paid = await invoice.isPaid();
      if (paid) {
        clearInterval(intervalId);
        io.emit("payment-verified", {
          message: "Payment verified successfully",
        });
        sendNotification(req.body as PurchaseRequest,res)
      }
    }, 3000);
  } catch (error) {
    res.status(400).json({
      error: "Error occured while verifying payment",
    });
  }
};
