"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = void 0;
const lightning_tools_1 = require("@getalby/lightning-tools");
const listenInvoice_1 = require("../helpers/listenInvoice");
if (!process.env.MERCHANT_LN_ADDRESS) {
    throw new Error("Merchant's Lightning address environment variable is not defined");
}
const ln = new lightning_tools_1.LightningAddress(process.env.MERCHANT_LN_ADDRESS);
const generateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.amount) {
            return res.status(400).json({
                error: "Please specify your invoice amount",
            });
        }
        yield ln.fetch();
        // get the LNURL-pay data:
        const invoice = yield ln.requestInvoice({
            satoshi: req.body.amount,
        });
        (0, listenInvoice_1.listenInvoice)(invoice, res);
        return res.status(200).json({
            invoice: invoice,
        });
    }
    catch (error) {
        res.status(400).json({
            error: "Error encountered while generating invoice",
        });
    }
});
exports.generateInvoice = generateInvoice;
