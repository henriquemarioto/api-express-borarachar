import {Router} from 'express'
import UserControllers from '../controllers/user.js'

const routerUsers = Router()

routerUsers.get("", (req, res) => UserControllers.getAllUsers(req, res))
routerUsers.get("/:id", (req, res) => UserControllers.getUserById(req, res))
routerUsers.patch("/:id", (req, res) => UserControllers.updateUser(req, res))
routerUsers.delete("/:id", (req, res) => UserControllers.deleteUser(req, res))


export default routerUsers