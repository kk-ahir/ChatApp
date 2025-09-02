import React from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Type from './Type'
import useConversation from '../../statemanage/useConversation.js'

function Right() {
    const { selectedConversation } = useConversation();

    // safely handle null
    const userName = selectedConversation?.name;
    return (
        <>
            {userName && <div className="w-[70%] flex flex-col bg-slate-950 text-white">
                {/* Top: Chat User Info */}
                <div className="p-4 border-b border-gray-800">
                    <Chatuser />
                </div>

                {/* Middle: Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <Messages />
                </div>

                {/* Bottom: Input */}
                <div className="p-4 border-t border-gray-800">
                    <Type />
                </div>
            </div>}
        </>
    )
}

export default Right
