import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({ // подумать про userId и userName
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
    userId: {
        type: String,
        required: true
    }
})
