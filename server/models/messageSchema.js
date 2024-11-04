import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})