import Streaming from '../models/streaming.js';
import jsonwebtoken from 'jsonwebtoken';

class StreamingControllers {
    static async create(req, res){
        try {
            const { name, type, profiles, image, plans } = req.body

            const streaming = await Streaming.create({
                name, type, profiles, image, plans
            })

            res.status(201).json({ id: streaming.id })
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async getById(req, res){
        try {
            const { id } = req.params
            const streaming = await Streaming.findById(id)

            res.json(streaming)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getAll(req, res){
        try {
            const streamings = await Streaming.find()

            res.status(200).json(streamings)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getUserStreaming(user){
        const streamingsData = []

        await Promise.all(user.searching_for.map(async stremingId => {

            const streamingData = await Streaming.findById(stremingId).select("image")
            streamingsData.push(streamingData)

        }))

        user.searching_for = streamingsData

        return user
    }
}

export default StreamingControllers