import express from 'express'
import routerUsers from './routes/users.js'
import routerGroups from './routes/groups.js'

const app = express()
app.use(express.json())

app.use('/users', routerUsers)
app.use('/groups', routerGroups)

export default app