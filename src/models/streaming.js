import mongoose from "../database/index.js";
import uniqueValidatore from 'mongoose-unique-validator'

const streamingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    plans: {
        type: Object,
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