import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from "socket.io-client";
import { useAuth } from './AuthProvider';

const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        if (!authUser) return;

        const socketInstance = io("http://localhost:3000", {
            query: { userId: authUser.user._id },
        });

        setSocket(socketInstance);

        const handleOnlineUsers = (users) => setOnlineUsers(users);
        socketInstance.on("getOnline", handleOnlineUsers);

        return () => {
            socketInstance.off("getOnline", handleOnlineUsers);
            socketInstance.close();
        };
    }, [authUser]);

    useEffect(() => {
        console.log("Online users updated:", onlineUsers);
    }, [onlineUsers]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
