import { Router } from "express";
import { fetchProducts } from "../controllers/fetchProducts";
import { generateInvoice } from "../controllers/generateInvoice";
import { listenInvoice } from "../controllers/listenInvoice";
const router = Router()


router.get("/products",fetchProducts)
router.post("/invoice",generateInvoice)
router.post("/listen",listenInvoice)

export default router