import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../contex/useSendMessage.js"; // adjust path

function Type() {
    const [text, setText] = useState("");
    const { sendMessage, sending } = useSendMessage();

    const handleSend = (e) => {
        e.preventDefault();
        if (!text.trim()) return; // avoid sending empty messages
        sendMessage(text);
        setText(""); // clear input
    };

    return (
        <form onSubmit={handleSend} className="flex items-center space-x-2">
            {/* Input Field */}
            <div className="flex items-center bg-slate-800 border border-gray-700 rounded-full px-4 py-2 w-full">
                <input
                    type="text"
                    className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            {/* Send Button */}
            <button
                type="submit"
                aria-label="Send"
                disabled={sending}
                className={`p-3 rounded-full transition ${sending ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                <IoMdSend className="text-xl text-white" />
            </button>
        </form>
    );
}

export default Type;
