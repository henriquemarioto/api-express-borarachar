import {Router} from 'express'
import GroupControllers from '../controllers/group.js'
import { isAuthenticated, isGroupOwner } from "../middleware/auth.js"

const routerGroups = Router()

routerGroups.use(isAuthenticated)
routerGroups.post("", GroupControllers.createGroup)
routerGroups.get("", GroupControllers.getAllGroups)
routerGroups.get("/:id", GroupControllers.getGroupById)
routerGroups.patch("/:id/join", GroupControllers.joinGroup)
routerGroups.patch("/:id/exit", GroupControllers.exitGroup)
routerGroups.patch("/:id", GroupControllers.updateGroup)
routerGroups.delete("/:id", GroupControllers.deleteGroup)


export default routerGroups