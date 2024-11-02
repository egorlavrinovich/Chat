import {Server} from "socket.io";
import express from 'express'
import {createServer} from 'node:http';
import mongoose from "mongoose";
import {router} from "./router/router.js";
import 'dotenv/config'
import RoomController from "./controller/room.js";

const DB_URL = "mongodb://egorlavrinovich:1qz3ec5tb@ac-1crtasn-shard-00-00.qdjkfij.mongodb.net:27017,ac-1crtasn-shard-00-01.qdjkfij.mongodb.net:27017,ac-1crtasn-shard-00-02.qdjkfij.mongodb.net:27017/chat?ssl=true&replicaSet=atlas-ydpl7y-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

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

app.use(express.json());
app.use("", router);

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL)
        server.listen(PORT, (error) => {
                io.on('connection', (socket) => {
                    const roomController = new RoomController({io, socket})

                    socket.on('join', async ({name: userName, room}) => await roomController.joinToRoom({
                        userName,
                        room,
                        id: socket?.id
                    }))

                    socket.on('sendMessage', async (message, cb) => {
                        await roomController.sendMessage(message)
                        cb()
                    })

                    socket.on("disconnecting", () => roomController.leaveRoom(socket?.user));

                });


                if (!error)
                    console.log("Server is Successfully " + PORT)
                else
                    console.log("Error occurred, server can't start", error);
            }
        );
    } catch (e) {
        console.log(e)
    }
}


startApp()


