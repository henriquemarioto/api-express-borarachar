import { Router } from 'express'
import StreamingControllers from '../controllers/streaming.js'

const routerStreaming = Router()

routerStreaming.get("", StreamingControllers.getAll)
routerStreaming.post("", StreamingControllers.create)

export default routerStreaming