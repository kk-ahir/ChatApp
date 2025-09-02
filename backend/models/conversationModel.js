import mongoose from "mongoose";
import User from "./userSchema.js";
import Message from "./messageModel.js";

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: [],
            },
        ],
    },
    { timestamps: true } // <-- should be the 2nd argument
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
