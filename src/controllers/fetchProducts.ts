import { Request, Response } from "express";
const data = require("../../data.json");

export const fetchProducts = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(400).json({
        error:"Error encountered while fetching product data"
    })
  }
};
