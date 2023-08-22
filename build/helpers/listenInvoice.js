const sendNotification = require("./email");

module.exports.listenInvoice = async (req, invoice, res) => {
  try {
    const intervalId = setInterval(async () => {
      const paid = await invoice.isPaid();
      if (paid) {
        clearInterval(intervalId);
        req.io.emit("payment-verified", {
          message: "Payment verified successfully",
        });
        sendNotification(req.body, res);
      }
    }, 5000);
  } catch (error) {
    res.status(400).json({
      error: "Error occured while verifying payment",
    });
  }
};
