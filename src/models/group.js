import mongoose from "../database/index.js";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    members_limit: {
        type: Number,
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

const Group = mongoose.model("Group", groupSchema)

export default Group