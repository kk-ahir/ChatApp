import React, { useRef, useEffect } from 'react';
import Message from './Message';
import useGetMessage from '../../contex/useGetMessage';
import useGetSocketMessage from '../../contex/useGetSocketMessage';
import useConversation from '../../statemanage/useConversation';
import Loading from '../../components/Loading';

function Messages({ conversationId }) {
    const { messages, loading } = useConversation(); // get messages directly from Zustand
    const { fetchMessages } = useGetMessage(conversationId); 
    useGetSocketMessage(); // updates Zustand messages

    const chatRef = useRef(null);

    // auto-scroll
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    if (loading) return <Loading />;

    return (
        <div ref={chatRef} className="flex flex-col p-4 overflow-y-auto h-full">
            {Array.isArray(messages) && messages.length > 0 ? (
                messages.map(msg => <Message key={msg._id} message={msg} />)
            ) : (
                <div className="text-center text-gray-400 mt-4">Say Hi! 👋</div>
            )}
        </div>
    );
}

export default Messages;
