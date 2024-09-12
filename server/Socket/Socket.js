import { Server } from "socket.io";
import http from 'http';
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"]
    }
});

export const getrecieverSocketId = (recieverId) =>{
    return userSocketMap[recieverId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    // Initialize the userSocketMap[userId] as an array
    if (userId && userId !== "undefined") {
        if (!userSocketMap[userId]) {
            userSocketMap[userId] = [];
        }
        userSocketMap[userId].push(socket.id);

        console.log("userSocketMap", userSocketMap);
        console.log("a user connected", socket.id);

        // Emit online users excluding the socket ID of the newly connected user
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);

        // Remove the disconnected socket ID from the userSocketMap
        for (let user in userSocketMap) {
            const index = userSocketMap[user].indexOf(socket.id);
            if (index > -1) {
                userSocketMap[user].splice(index, 1);
            }
            if (userSocketMap[user].length === 0) {
                delete userSocketMap[user];
            }
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
