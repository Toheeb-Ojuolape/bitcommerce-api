"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fetchProducts_1 = require("../controllers/fetchProducts");
const generateInvoice_1 = require("../controllers/generateInvoice");
const router = (0, express_1.Router)();
router.get("/products", fetchProducts_1.fetchProducts);
router.post("/invoice", generateInvoice_1.generateInvoice);
exports.default = router;
