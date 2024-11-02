import mongoose from "mongoose";
import {messageSchema} from "./messageSchema.js";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        required: true
    },
    messages: {
        type: [messageSchema],
        required: true,
        default: []
    }
})

export const chatRoomSchema = mongoose.model("rooms", roomSchema) // name - название коллекции в бд куда идёт запись