import { Invoice } from "@getalby/lightning-tools";
import { Response } from "express";
import { io } from "../../app";


export const listenInvoice = async (
  invoice: Invoice,
  res: Response
) => {
  try {
    const id = setInterval(async () => {
      const paid = await invoice.isPaid();
      if (paid) {
        clearInterval(id);
        io.emit("payment-verified", {
          message: "Payment verified successfully",
        });
      }
    }, 5000);
  } catch (error) {
    res.status(400).json({
      error: "Error occured while verifying payment",
    });
  }
};
