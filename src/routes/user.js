import {Router} from 'express'
import UserControllers from '../controllers/user.js'
import { isAuthenticated } from "../middleware/auth.js"

const routerUsers = Router()

routerUsers.get("", isAuthenticated, UserControllers.getAllUsers)
routerUsers.get("/:id", isAuthenticated, UserControllers.getUserById)
routerUsers.patch("/:id", isAuthenticated, UserControllers.updateUser)
routerUsers.delete("/:id", isAuthenticated, UserControllers.deleteUser)


export default routerUsers