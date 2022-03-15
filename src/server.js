import app from './app.js'
import cors from 'cors'

app.use(cors())
const port = 3000

app.listen(process.env.PORT || port, () => {
    console.log(`Api running on port ${port}`)
})