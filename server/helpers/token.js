import jwt from 'jsonwebtoken'
import {EXPIRE_TOKEN_TIME} from "../constants/user/token.js";

export const generateToken = (data) => jwt.sign(data, process.env.PRIVATE_KEY, {expiresIn: EXPIRE_TOKEN_TIME})