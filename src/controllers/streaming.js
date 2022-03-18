import Streaming from '../models/streaming.js';
import jsonwebtoken from 'jsonwebtoken';

class StreamingControllers {
    static async create(req, res){
        try {
            const { name, image, plans } = req.body

            const streaming = await Streaming.create({
                name, image, plans
            })

            res.status(201).json({ id: streaming.id })
        }
        catch (error) {
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
}

export default StreamingControllers