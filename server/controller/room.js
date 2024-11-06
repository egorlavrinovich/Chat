import {chatRoomSchema} from "../models/roomSchema.js";

const buffer = {
    room: {
        messages: []
    },
    user: {}
}

class RoomController {
    constructor({io, socket}) {
        this.io = io
        this.socket = socket
    }

    async createRoom(user) {
        const {room: name} = user
        try {
            const room = await chatRoomSchema.findOne({name})
            if (!room) await chatRoomSchema.create({name, users: [user], messages: []})
            else await chatRoomSchema.updateOne({name}, {$push: {users: user}})
            return {...room, name, users: [...room?.users || [], user], messages: room?.messages || []}
        } catch (e) {
            return e
        }
    }

    async joinToRoom(user) {
        try {
            const {room, userName} = user
            this.socket.join(room)
            buffer.room = await this.createRoom(user)
            this.io.to(room)
                .emit('userCount', buffer.room?.users)
            this.io.to(room)
                .emit('userJoined', userName)
            buffer.user = user
            this.io.to(buffer.room?.name).emit('message', buffer.room?.messages)
        } catch (e) {
            console.log(e)
        }

    }

    async sendMessage(messages) {
        try {
            const {room, user} = buffer
            const resultMessages = await chatRoomSchema.findOneAndUpdate({name: room?.name}, {
                $push: {
                    messages: {
                        ...messages,
                        userId: user?.id //TODO when authorize will done, change userId
                    }
                }
            }, {new: true})
            room.messages = resultMessages?.messages
            this.io.to(room?.name).emit('message', room.messages)
        } catch (e) {
            console.log(e)
        }
    }

    async leaveRoom() {
        try {
            const {room, user} = buffer
            const updatedUserList = buffer.room?.users?.filter(({id}) => id !== user?.id)
            await chatRoomSchema.updateOne({name: room?.name}, {$set: {users: updatedUserList}})
            this.io.to(room?.name).emit('userLeaveChat', user)
            this.io.to(room?.name).emit('userCount', updatedUserList)
            this.socket.leave(room?.name)
        } catch (e) {
            console.log(e)
        }
    }
}

export default RoomController