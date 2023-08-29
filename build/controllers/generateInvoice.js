const { LightningAddress } =require("@getalby/lightning-tools")
const { listenInvoice } =require("../helpers/listenInvoice");
const { sumAmount } = require("../utils/sumAmount");

if (!process.env.MERCHANT_LN_ADDRESS) {
  throw new Error(
    "Merchant's Lightning address environment variable is not defined"
  );
}

const ln = new LightningAddress("toheeb@getalby.com");

module.exports.generateInvoice = async (req, res) => {
  const { name, email, order, products } = req.body;
  try {
    if (products.length == 0) {
      return res.status(400).json({
        error: "Please select products to purchase",
      });
    }
    await ln.fetch();
    // get the LNURL-pay data:
    const invoice = await ln.requestInvoice({
      satoshi: sumAmount(products),
      comment: order,
      payerdata: {
        name: name,
        email: email
    }
    });

    listenInvoice(req,invoice,res)

    return res.status(200).json({
      invoice: invoice,
    });
  } catch (error) {
    console.error(error)
    res.status(400).json({
      error: "Error encountered while generating invoice",
    });
  }
};
