import mongoose from "../database/index.js";
import uniqueValidatore from 'mongoose-unique-validator'

const streamingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    profiles: {
        type: String,
        required: true
    },
    plans: {
        type: Array,
        required: true
    },
    created_at: {
        type: String,
        default: new Date(),
    },
    updated_at: {
        type: String,
        default: null
    }
})

streamingSchema.plugin(uniqueValidatore)

const Streaming = mongoose.model("Streaming", streamingSchema)

export default Streaming