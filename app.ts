require("dotenv").config()
const express = require("express");
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

const io = require("socket.io")(server, {
  cors: {
    origin: [process.env.PROJECT_URL],
  },
});

io.on("connection", async (socket: Socket) => {
  console.log("User connected", socket.id);
  socket.on("payment-completed", (message) => {
    io.emit("settled",message)
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  })
})

app.use(router);
