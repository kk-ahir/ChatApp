import { useState } from "react";
import axios from "axios";
import useConversation from "../statemanage/useConversation.js";

function useSendMessage() {
    const { messages, setMessages, selectedConversation } = useConversation();
    const [sending, setSending] = useState(false);

    const sendMessage = async (text) => {
        if (!selectedConversation?._id || !text.trim()) return;

        setSending(true);

        try {
            const res = await axios.post(
                `http://localhost:3000/user/message/send/${selectedConversation._id}`,
                { message: text },
                { withCredentials: true } // send cookies if using HttpOnly JWT
            );

            // Backend should return the saved message object
            const newMessage = res.data?.newMessage;

            if (newMessage) {
                // update local state
                setMessages([...messages, newMessage]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setSending(false);
        }
    };

    return { sendMessage, sending };
}

export default useSendMessage;
