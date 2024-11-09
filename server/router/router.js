import Router from 'express'
import AuthController from "../controller/auth.js";
import {VALIDATORS_MAP} from "../helpers/validator.js";

export const router = new Router()

const {email, length, password} = VALIDATORS_MAP

router.post('/registration', [email, length({
    fields: ['name'],
    max: 20,
    min: 2
}), password], AuthController.registration)

router.post('/login', [email, password], AuthController.login)
