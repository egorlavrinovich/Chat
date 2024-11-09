import mongoose, {Schema} from "mongoose";
import {USER_ROLES} from "../../constants/user/roles.js";

const {ADMIN, MODERATOR, USER} = USER_ROLES

const userRolesSchema = new Schema({
    roles: {
        type: String,
        enum: [ADMIN, MODERATOR, USER],
        default: USER
    }
})

export const userRoles = mongoose.model('Roles', userRolesSchema)