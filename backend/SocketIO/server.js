import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
const users = {};

// real time messages 
export const getReceiverSocketId = (recevire) => {
    return users[recevire];
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected:", userId, socket.id);

    if (userId) users[userId] = socket.id;

    io.emit("getOnline", Object.keys(users)); // send online user IDs

    socket.on("sendMessage", (data) => {
        const receiverSocketId = users[data.receiverId];
        console.log("Received data:", data);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", data);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        for (let id in users) {
            if (users[id] === socket.id) delete users[id];
        }
        io.emit("getOnline", Object.keys(users));
    });
});
export { app, server, io };
