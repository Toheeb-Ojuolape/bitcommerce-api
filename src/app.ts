require("dotenv").config()
const express = require("express");
import { Request,Response } from "express";
import router from "./routes/routes";
const cors = require("cors");

const port = process.env.PORT || 5001;

const app = express();

app.use(
  cors({
    origin: process.env.PROJECT_URL,
  })
);

app.use(express.json());

const server = app.listen(port, () => {
  console.log(`App listening on PORT: ${port}`);
});


app.get("/",(req:Request,res:Response)=>{
  res.send(`<h2>Bitcommerce API</h2>`)
})

const io = require("socket.io")(server, {
  cors: {
    origin: [process.env.PROJECT_URL],
  },
});


app.use(router);

export { io };
