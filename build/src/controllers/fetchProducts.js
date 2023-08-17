"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProducts = void 0;
const data = require("../../../data.json");
const fetchProducts = (req, res) => {
    try {
        res.status(200).json({
            data: data,
        });
    }
    catch (error) {
        res.status(400).json({
            error: "Error encountered while fetching product data"
        });
    }
};
exports.fetchProducts = fetchProducts;
