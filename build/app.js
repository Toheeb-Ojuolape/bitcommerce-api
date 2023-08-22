require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const router = require("./routes/routes");


const port = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.PROJECT_URL,
  })
);

app.use(express.json());

server.listen(port, () => {
  console.log(`App listening on PORT: ${port}`);
});

const io = socketIo(server, {
  cors: {
    origin: [process.env.PROJECT_URL],
  },
});

app.get("/", (req, res) => {
  res.send("<h2>Bitcommerce API</h2>");
});

// Attach the io instance to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(router);

// No need to export io in this case
