import {chatRoomSchema} from "../models/chatRoom.js";
import {getMessages} from "../recieveMessages.js";

class RoomController {
    constructor({io, socket}) {
        this.io = io
        this.socket = socket
        this.room = []
    }

    async createRoom(user) {
        const {room: name} = user
        try {
            const room = await chatRoomSchema.findOne({name})
            if (!room) await chatRoomSchema.create({name, users: [user]})
            else await chatRoomSchema.updateOne({name}, {$push: {users: user}})
            return {...room, users: [...room?.users || [], user]}
        } catch (e) {
            return e
        }
    }

    async joinToRoom(user) {
        const {room, userName} = user
        this.room = await this.createRoom(user)
        this.socket.join(room)
        this.socket
            .emit('message', getMessages())
        this.io.to(room)
            .emit('userCount', this.room?.users)
        this.io.to(room)
            .emit('userJoined', userName)
        this.socket.user = user
    }

    async leaveRoom(user) {
        try {
            const {room, id: userId} = user
            const updatedUserList = this.room?.users?.filter(({id}) => id !== userId)
            await chatRoomSchema.updateOne({name: room}, {$set: {users: updatedUserList}})
            this.io.to(room).emit('userLeaveChat', user)
            this.io.to(room).emit('userCount', updatedUserList)
            this.socket.leave(room)
        } catch (e) {
            return e
        }
    }
}

export default RoomController