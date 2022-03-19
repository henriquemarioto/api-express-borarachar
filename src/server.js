import app from './app.js'

const port = 3000

app.listen(process.env.PORT || port, () => {
    console.log(`Api running on port ${port}`)
})

async function CreateRandomUser(){
    const endPoint = "https://api-express-dividecomigo.herokuapp.com/"

    
}