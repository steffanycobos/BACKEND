import { Router, json } from "express";
import MessageManager from "../dao/db-managers/messages.dao.js";

const messageManager = new MessageManager();
const messageRouter = Router();
messageRouter.use(json());


messageRouter.get("/", async (req, res) => {
  const messages = await messageManager.getMessages();
  res.send(messages);
});

export default messageRouter;