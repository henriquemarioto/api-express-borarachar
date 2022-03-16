import mongoose from "../database/index.js";
import uniqueValidatore from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    cpf: {
        type: Number,
        required: true,
        select: false,
        unique: true
    },
    avatar_url: {
        type: String,
        default: ""
    },
    contacts: {
        type: Array,
        default: []
    },
    streamings: {
        type: Object,
        default: {
            searching_for: [],
            already_member: [],
        },
    }, 
    notification: {
        type: Array,
        default: []
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

userSchema.plugin(uniqueValidatore)

const User = mongoose.model("User", userSchema)

export default User