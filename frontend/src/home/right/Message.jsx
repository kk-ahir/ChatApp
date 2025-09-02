import React from "react";
import { useAuth } from "../../contex/AuthProvider";

function Message({ message }) {
    const { authUser } = useAuth();
    const isOwnMessage = message.sender.toString() === authUser?.user?._id?.toString();

    const formatTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    return (
        <div className={`chat flex flex-col ${isOwnMessage ? "items-end" : "items-start"} mb-2`}>
            {!isOwnMessage && (
                <img
                    src={message?.sender?.avatar || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mb-1"
                />
            )}
            <div className={`chat-bubble ${isOwnMessage ? "chat-bubble-neutral" : "chat-bubble-info"}`}>
                {message.message}
            </div>
            <span className="text-xs text-gray-400 mt-1">{formatTime(message.createdAt)}</span>
        </div>
    );
}

export default Message;

