import {Server} from "socket.io";
import express from 'express'
import cors from 'cors'
import {createServer} from 'node:http';

const app = express();
const PORT = 5000;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('join', ({room}) => {
        socket.join(room)

        socket.emit('message', {
            data: {
                user: {name: 'Admin'}, room
            }
        })
    })
    io.on('disconnect', () => {
        console.log("Disconnect")
    })
});

server.listen(PORT, (error) => {
        if (!error)
            console.log("Server is Successfully " + PORT)
        else
            console.log("Error occurred, server can't start", error);
    }
);

