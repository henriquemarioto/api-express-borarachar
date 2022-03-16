import { Router } from 'express'
import UserControllers from '../controllers/user.js'

const routerLogin = Router()

routerLogin.post("", (req, res) => UserControllers.login(req, res))

export default routerLogin