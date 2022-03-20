import axios from 'axios'

import Streaming from './models/streaming.js';

const streamingsIds = [
    "6234808bd697f0557103abff",
    "6234d9702c602cca71b86d10",
    "6234da472c602cca71b86d13",
    "6234da8e2c602cca71b86d16",
    "6234daaa2c602cca71b86d19",
    "6234dac22c602cca71b86d1c",
    "6234dae92c602cca71b86d1f",
    "6234db7e2c602cca71b86d22",
    "6234db9d2c602cca71b86d25",
    "6234dbb72c602cca71b86d28",
    "6234dbd32c602cca71b86d2b",
    "6234dc232c602cca71b86d2e",
    "6234dc482c602cca71b86d31",
    "6234dc622c602cca71b86d34",
    "6234dc7e2c602cca71b86d37",
    "6234dc9d2c602cca71b86d3a",
    "6234dcbe2c602cca71b86d3f",
    "6234dcdd2c602cca71b86d42"
]

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBoolean() {
    return Math.floor(Math.random() * (1 - 0 + 1)) + 0
}

async function CreateRandomUser() {
    const apiEndpoint = "https://api-express-dividecomigo.herokuapp.com"

    const people = await axios.get('https://api.namefake.com/').then(res => res.data)

    const name1 = people.name.split(' ')[0].toLowerCase()
    const name2 = people.name.split(' ')[1].toLowerCase()

    const user = (await axios.post(`${apiEndpoint}/register`, {
        email: `${name1.replace('.', '')}@${name2.replace('.', '')}.com`,
        password: '123456',
        name: `${name1} ${name2}`,
        phone: randomNumber(10000000000, 99999999999),
        cpf: randomNumber(10000000000, 99999999999),
        gender: randomBoolean() ? 'm' : 'f'
    })).data

    const headers = {
        authorization: `Bearer ${user.token}`
    }

    //Colcoar streaming no searching for searching_for
    if (randomBoolean()) {
        const numberOfStreaming = randomNumber(1, 6)
        console.log(`numero sorteado ${numberOfStreaming}`)
        const searching_for = []

        for(let i = 0; i < numberOfStreaming; i++){
            const streamingIndex = randomNumber(0, streamingsIds.length - 1)
            if ((streamingsIds[streamingIndex] !== searching_for.find(item => item === streamingsIds[streamingIndex]))){
                searching_for.push(streamingsIds[streamingIndex])
            }
            else{
                i--
            }
        }

        console.log(`Streamings: ${searching_for}`)

        await axios.patch(`${apiEndpoint}/users/${user.id}`, { searching_for }, {headers})
    }

    console.log('Created!')

    return
}

for(let i = 0; i < 20; i++){

    CreateRandomUser()
}