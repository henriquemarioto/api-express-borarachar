import mongoose from "../database/index.js";
import uniqueValidatore from 'mongoose-unique-validator'

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
    members: {
        type: Array,
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pix_key: {
        type: String,
        required: true
    },
    pay_day: {
        type: Number,
        required: true
    },
    account_email: {
        type: String,
        required: true
    },
    account_password: {
        type: String,
        required: true,
        select: false
    },
    searching_for_people: {
        type: Boolean,
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

groupSchema.plugin(uniqueValidatore)

const Group = mongoose.model("Group", groupSchema)

export default Group