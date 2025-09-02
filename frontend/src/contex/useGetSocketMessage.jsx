import { useEffect } from 'react';
import { useSocketContext } from './socketContext';
import sound from '../assets/notification.mp3';
import useConversation from '../statemanage/useConversation';

function useGetSocketMessage() {
    const { setMessages } = useConversation();
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            console.log("New socket message received:", newMessage);
            new Audio(sound).play().catch(() => { });// notificstion for new msg
            setMessages(prev => [...prev, newMessage]);//prev msg+newmsg 
        };

        socket.on("newMessage", handleNewMessage);

        return () => socket.off("newMessage", handleNewMessage);
    }, [socket, setMessages]);
}

export default useGetSocketMessage;

