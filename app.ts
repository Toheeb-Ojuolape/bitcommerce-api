require("dotenv").config()
const express = require("express");
import { Request,Response } from "express";
import router from "./src/routes/routes";
import { Socket } from "socket.io";
const cors = require("cors");

const port = 5000;

const app = express();

app.use(
  cors({
    origin: "*",
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
