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
    owner: {
        type: String,
        ref: "User",
        required: true
    },
    members_limit: {
        type: Number,
        required: true
    },
    streaming: {
        type: Object,
        required: true
    },
    members: {
        type: Array,
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
    searching_for_members: {
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