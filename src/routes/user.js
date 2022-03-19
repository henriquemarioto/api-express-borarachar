import {Router} from 'express'
import UserControllers from '../controllers/user.js'
import { isAuthenticated, isUserOwner } from "../middleware/auth.js"

const routerUsers = Router()

routerUsers.use(isAuthenticated)
routerUsers.get("", UserControllers.getAllUsers)
routerUsers.get("/groups", UserControllers.getUserGroups)
routerUsers.get("/profile", UserControllers.getUserById)
routerUsers.patch("/:id", isUserOwner, UserControllers.updateUser)
routerUsers.delete("/:id", isUserOwner, UserControllers.deleteUser)

export default routerUsers