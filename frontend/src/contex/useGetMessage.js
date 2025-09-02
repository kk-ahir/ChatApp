import { useState, useEffect } from "react";
import axios from "axios";
import useConversation from "../statemanage/useConversation.js";

function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const controller = new AbortController();
        const getmessages = async () => {
            if (!selectedConversation?._id) return;
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://localhost:3000/user/message/get/${selectedConversation._id}`,
                    { withCredentials: true, signal: controller.signal }
                );
                setMessages(Array.isArray(res.data?.messages) ? res.data.messages : []);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.log("error in getMessage", error);
                }
                setMessages([]);
            } finally {
                setLoading(false);
            }
        };

        getmessages();
        return () => controller.abort();
    }, [selectedConversation, setMessages]);

    return { messages, setMessages, loading };
}

export default useGetMessage;
