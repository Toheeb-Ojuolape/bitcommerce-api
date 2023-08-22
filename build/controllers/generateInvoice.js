const { LightningAddress } =require("@getalby/lightning-tools")
const { listenInvoice } =require("../helpers/listenInvoice")

if (!process.env.MERCHANT_LN_ADDRESS) {
  throw new Error(
    "Merchant's Lightning address environment variable is not defined"
  );
}

const ln = new LightningAddress(process.env.MERCHANT_LN_ADDRESS);

module.exports.generateInvoice = async (req, res) => {
  try {
    if (!req.body.amount) {
      return res.status(400).json({
        error: "Please specify your invoice amount",
      });
    }
    await ln.fetch();
    // get the LNURL-pay data:
    const invoice = await ln.requestInvoice({
      satoshi: req.body.amount,
      comment: req.body.order,
      payerdata: {
        name: req.body.name,
        email: req.body.email
    }
    });

    listenInvoice(req,invoice,res)

    return res.status(200).json({
      invoice: invoice,
    });
  } catch (error) {
    res.status(400).json({
      error: "Error encountered while generating invoice",
    });
  }
};
