import {user} from "../models/user/userSchema.js";
import {validationResult} from "express-validator";
import {generateToken} from "../helpers/token.js";

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }

            const {email} = req?.body
            const isUserExist = await user.exists({email})
            if (!isUserExist) {
                await user.create(req?.body)
                return res.status(200).json({message: 'Пользователь создан'})
            }
            return res.status(400).json({message: 'Пользователь c таким e-mail уже существует'})
        } catch (e) {
            return res.status(400).json({message: e?.message})
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при авторизации', errors})
            }
            const {email, password} = req?.body

            const userProfile = await user.findOne({email})
            if (!userProfile) return res.status(400).json({message: 'Такого пользователя не существуеют'})
            if (userProfile?.password !== password) return res.status(400).json({message: 'Неверный логин или пароль'})
            const {id, name} = userProfile
            return res.status(200).json({token: generateToken({id, name})})
        } catch (e) {
            return res.status(400).json({message: e?.message})
        }
    }
}

export default new AuthController()