import mongoose from "mongoose";
import {messageSchema} from "./messageSchema.js";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        required: true,
        ref: 'Users'
    },
    messages: {
        type: [messageSchema],
        default: []
    }
})

export const chatRoomSchema = mongoose.model("Rooms", roomSchema) // name - название коллекции в бд куда идёт запись