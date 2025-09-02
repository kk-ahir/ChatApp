import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userroutes.js';
import cors from 'cors';
import cookiparser from 'cookie-parser'
import messageRoute from './routes/messageroute.js';
import { app,server } from './SocketIO/server.js';

dotenv.config();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", //  frontend
    credentials: true                //  allow cookies
}));

app.use(cookiparser());

const mongourl = process.env.MONGO_URI;

try {
    mongoose.connect(mongourl);
    console.log("database connected")
} catch (error) {
    console.log(error.message)
}

app.use("/user", userRoute);
app.use("/user/message", messageRoute);

server.listen(process.env.PORT, () => {
    console.log("app running");
});