import React from "react";
import useConversation from "../statemanage/useConversation.js";
import { useSocketContext } from "../contex/socketContext.jsx";

function User({ user }) {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { socket, onlineUsers } = useSocketContext();
    const isOnline = (onlineUsers || []).includes(user._id);
    const isSelected = selectedConversation?._id === user._id;

    return (
        <div
            onClick={() => setSelectedConversation(user)}
            className={`flex space-x-4 px-6 py-7 cursor-pointer duration-300 rounded-lg
        ${isSelected ? "bg-slate-700" : "hover:bg-slate-600"}`}
        >
            <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
                <div className="w-14 rounded-full">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                        alt={user.name}
                    />
                </div>
            </div>
            <div>
                <h1 className="font-bold">{user.name}</h1>
                <span className="text-sm text-gray-400">{user.email}</span>
            </div>
        </div>
    );
}

export default User;
