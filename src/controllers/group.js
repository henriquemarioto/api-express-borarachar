import Group from '../models/group.js'

class GroupControllers {
    static async createGroup(req, res) {
        try {
            const { name, description, members_limit, owner, pix_key, pay_day, account_email, account_password, searching_for_people } = req.body

            const group = await Group.create({
                name, description, members_limit, owner, pix_key, pay_day, account_email, account_password, searching_for_people
            })

            res.status(201).json({ id: group.id })
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async getAllGroups(req, res) {
        try {
            const group = await Group.find()

            res.json(group)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getGroupById(req, res) {
        try {
            const { id } = req.params
            const group = await Group.findById(id)

            res.json(group)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async updateGroup(req, res) {
        try {
            const { id } = req.params
            const { name, description, members_limit, owner, pix_key, pay_day, account_email, account_password, searching_for_people } = req.body

            const groupUpdated = await Group.findByIdAndUpdate(id, {
                name, description, members_limit, owner, pix_key, pay_day, account_email, account_password, searching_for_people, updated_at: new Date(), new: true
            }, {
                returnDocument: "after"
            })

            res.json(groupUpdated)
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteGroup(req, res) {
        try {
            const { id } = req.params

            await Group.findByIdAndRemove(id)

            res.status(204).json({})
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async joinMember(req, res) {
        try {
            const { id } = req.params
            const { member } = req.body
            const group = await Group.findById(id)

            const members = [...group.members, member]

            const groupUpdated = await Group.findByIdAndUpdate(id, { members }, {
                returnDocument: "after"
            })
            
            res.status(201).json(groupUpdated)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default GroupControllers