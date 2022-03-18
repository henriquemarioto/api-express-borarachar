import { Router } from 'express'
import UserControllers from '../controllers/user.js'

const routerRecovery = Router()

routerRecovery.patch("/password", (req, res) => UserControllers.recoveryPassword(req, res))

export default routerRecovery