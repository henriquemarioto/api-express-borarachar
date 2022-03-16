import {Router} from 'express'
import GroupControllers from '../controllers/group.js'
import { isAuthenticated } from "../middleware/auth.js"

const routerGroups = Router()

routerGroups.post("", isAuthenticated, GroupControllers.createGroup)
routerGroups.get("", isAuthenticated, GroupControllers.getAllGroups)
routerGroups.get("/:id", isAuthenticated, GroupControllers.getGroupById)
routerGroups.patch("/:id", isAuthenticated, GroupControllers.updateGroup)
routerGroups.delete("/:id", isAuthenticated, GroupControllers.deleteGroup)


export default routerGroups