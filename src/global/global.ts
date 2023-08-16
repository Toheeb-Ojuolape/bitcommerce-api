import { Socket } from "socket.io";
import { Express } from "express";

declare module "express" {
  namespace Express {
    interface Request {
      io: Socket;
    }
  }
}