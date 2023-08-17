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
exports.listenInvoice = void 0;
const app_1 = require("../../app");
const listenInvoice = (invoice, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const paid = yield invoice.isPaid();
            if (paid) {
                clearInterval(id);
                app_1.io.emit("payment-verified", {
                    message: "Payment verified successfully",
                });
            }
        }), 5000);
    }
    catch (error) {
        res.status(400).json({
            error: "Error occured while verifying payment",
        });
    }
});
exports.listenInvoice = listenInvoice;
