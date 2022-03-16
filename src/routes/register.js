import { Router } from 'express'
import UserControllers from '../controllers/user.js'

const routerRegister = Router()

routerRegister.post("", (req, res) => UserControllers.createUser(req, res))

export default routerRegister