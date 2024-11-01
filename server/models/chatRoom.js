import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        required: true
    }
})

export const chatRoomSchema = mongoose.model("rooms", roomSchema) // name - название коллекции в бд куда идёт запись