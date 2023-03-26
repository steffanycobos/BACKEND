import messageModel from "../models/message.models.js"

 class MessageManager {
  constructor() {
    console.log("Working with messages using MongoDB");
  }

  getMessages = async () => {
    const messages = await messageModel.find().lean();
    return messages;
  };

  create = async (message) => {
    const result = await messageModel.create(message);
    return result;
  };
}
export default MessageManager;