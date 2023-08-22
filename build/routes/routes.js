const { Router } = require("express");
const { fetchProducts } = require("../controllers/fetchProducts")
const { generateInvoice } = require("../controllers/generateInvoice")
const router = Router()


router.get("/products",fetchProducts)
router.post("/invoice",generateInvoice)


module.exports = router