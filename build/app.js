"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("dotenv").config();
const express = require("express");
const routes_1 = require("./src/routes/routes");
const cors = require("cors");
const port = 5000;
const app = express();
app.use(cors({
    origin: "*",
}));
app.use(express.json());
const server = app.listen(port, () => {
    console.log(`App listening on PORT: ${port}`);
});
app.get("/", (req, res) => {
    res.send(`<h2>Bitcommerce API</h2>`);
});
const io = require("socket.io")(server, {
    cors: {
        origin: [process.env.PROJECT_URL],
    },
});
exports.io = io;
app.use(routes_1.default);
