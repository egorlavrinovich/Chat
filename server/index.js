import {Server} from "socket.io";
import express from 'express'
import {createServer} from 'node:http';
import {getMessages} from "./recieveMessages.js";

const app = express();
const PORT = 5000;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', "POST"]
    },
    connectionStateRecovery: {}
});
server.listen(PORT, (error) => {
        io.on('connection', (socket) => {

            socket.on('join', ({room}) => {
                socket.join(room)
                socket.emit('message', getMessages())
            })

            socket.on('sendMessage', ({message, params, date}) => {
                io.to(params?.room).emit('message', getMessages(message, params, date))
            })

            socket.on("disconnecting", (reason) => {
                socket.emit('userLeaveChat',)
            });

        });


        if (!error)
            console.log("Server is Successfully " + PORT)
        else
            console.log("Error occurred, server can't start", error);
    }
);

