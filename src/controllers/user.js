import User from '../models/user.js'

class UserControllers {
    static async createUser(req, res) {
        try {
            const { name, email, cpf, phone, password } = req.body

            const user = await User.create({
                name,
                email,
                password,
                cpf,
                phone
            })

            delete user.password

            res.status(201).json(user)
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

            res.status(204).json(userUpdated)
        }
        catch (error) {
            res.status(500).json(error)
        }
    }
}

export default UserControllers