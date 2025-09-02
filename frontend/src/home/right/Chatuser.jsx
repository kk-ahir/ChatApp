import React from 'react';
import useConversation from '../../statemanage/useConversation';
import { useSocketContext } from '../../contex/socketContext';

function Chatuser() {
    const { selectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    // Check if the selected user is online
    const isOnline = selectedConversation
        ? (onlineUsers || []).includes(selectedConversation._id)
        : false;

    // safely handle null
    const userName = selectedConversation?.name;

    return (
        <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors duration-200">

            {/* Avatar */}
            <div className="relative">
                <img
                    src={selectedConversation?.avatar || "https://cdn-icons-png.flaticon.com/512/219/219983.png"}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full object-cover border border-gray-700"
                />
                {/* Online dot */}
                {selectedConversation && isOnline && (
                    <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                )}
            </div>

            {/* User Info */}
            {userName && (
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">{userName}</h1>
                    <span className="text-sm text-gray-400">
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                </div>
            )}

        </div>
    );
}

export default Chatuser;
