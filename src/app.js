import express from 'express'
import routerUsers from './routes/user.js'
import routerGroups from './routes/group.js'
import routerRegister from './routes/register.js'
import routerLogin from './routes/login.js'
import recovery from './routes/recovery.js'
import { config } from 'dotenv'
import cors from 'cors'

config()
const app = express()
app.use(express.json())

app.use(cors())

app.use('/users', routerUsers)
app.use('/groups', routerGroups)
app.use('/register', routerRegister)
app.use('/login', routerLogin)
app.use('/recovery/:id', recovery)

export default app