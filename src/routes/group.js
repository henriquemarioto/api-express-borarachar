import {Router} from 'express'
import GroupControllers from '../controllers/group.js'
import { isAuthenticated, isRecurseOwner } from "../middleware/auth.js"

const routerGroups = Router()

routerGroups.use(isAuthenticated)
routerGroups.post("", GroupControllers.createGroup)
routerGroups.get("", GroupControllers.getAllGroups)
routerGroups.get("/:id", GroupControllers.getGroupById)
routerGroups.patch("/:id", GroupControllers.updateGroup)
routerGroups.patch("/joinMember/:id", isRecurseOwner, GroupControllers.joinMember)
routerGroups.delete("/:id", GroupControllers.deleteGroup)


export default routerGroups