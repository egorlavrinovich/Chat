import {body} from "express-validator";
import {ERROR_MESSAGES} from "../constants/errors/index.js";

const {email, emptyFields, password, filedLength} = ERROR_MESSAGES

export const VALIDATORS_MAP = {
    email: body('email', email).isEmail(),
    notEmpty: (fields) => body(fields, emptyFields).notEmpty(),
    password: body('password', password).isLength({min: 6, max: 20}),
    length: ({fields, min, max}) => body(fields, filedLength({min, max})).isLength({min, max})
}