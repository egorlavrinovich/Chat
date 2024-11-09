import mongoose, {Schema} from "mongoose";
import {USER_ROLES} from "../../constants/user/roles.js";

const {USER} = USER_ROLES


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        type: Array,
        ref: 'Roles',
        default: [USER]
    }
})

export const user = mongoose.model("Users", userSchema)