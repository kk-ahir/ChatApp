import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";


export const sendMessage = async (req, res) => {
    try {
        const receiver = req.params.id;
        const { message } = req.body;
        const sender = req.user._id;

        // Find existing conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [sender, receiver],
            });
        }

        // Create new message
        const newMessage = new Message({
            sender,
            receiver,
            message,
        });

        // Push message to conversation
        conversation.messages.push(newMessage._id);

        // Save both
        await Promise.all([newMessage.save(), conversation.save()]);// runs parallelly
        const recevireSocketId = getReceiverSocketId(receiver);
        if (recevireSocketId) {
            io.to(recevireSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({ message: "Message saved successfully", newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const chatUser = req.params.id;
        const sender = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [sender, chatUser] },
        }).populate("messages");

        if (!conversation) {
            return res.status(201).json({ message: "Conversation not found" });
        }

        const messages = conversation.messages;
        return res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}