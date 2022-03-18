import User from '../models/user.js'
import jwt from "jsonwebtoken"

class UserControllers {
    static async createUser(req, res) {
        try {
            const { name, email, cpf, phone, password, gender } = req.body

            const avatar_url = gender === "m" ? process.env.MALE : gender === "f" ? process.env.FEMALE : process.env.OTHER

            const user = await User.create({
                name,
                email,
                password,
                cpf,
                phone,
                gender,
                avatar_url
            })

            delete user.password

            const token = jwt.sign({
                id: user.id
            }, process.env.SECRET, { expiresIn: "1d" })

            res.status(201).json({token, id: user.id})
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async getAllUsers(req, res) {
        try {
            const user = await User.find()

            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)

            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async recoveryPassword(req, res) {
        const { email, phone, cpf, newPassword } = req.body

        try {
            const user = await User.findOne({ email, phone, cpf })

            if(user){
                await User.findByIdAndUpdate(user.id, {
                    password: newPassword, updated_at: new Date(), new: true
                })
                res.json({})
            }
            else{
                throw "Usuário não encontrado"
            }
        } catch (error) {
            res.status(404).json({error})
        }
        

    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params
            const { name, bio, contacts, streamings, notification } = req.body

            const userUpdated = await User.findByIdAndUpdate(id, {
                name, bio, contacts, streamings, notification, updated_at: new Date(), new: true
            }, {
                returnDocument: "after"
            })

            res.json(userUpdated)
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params

            await User.findByIdAndRemove(id)

            res.status(204).json({})
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({
                email
            }).select("+password")

            if(!user){
                res.status(404).json({error: "usuário não encontrado"})
            }

            if(user.password !== password){
                res.status(409).json({error: "Senha inválida"})
            }

            const token = jwt.sign({
                id: user.id
            }, process.env.SECRET, {expiresIn: "1d"})

            res.json({token, id: user.id})
        } catch (error) {

        }
    }
}

export default UserControllers