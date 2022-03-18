import Group from '../models/group.js'
import User from '../models/user.js';
import Streaming from '../models/streaming.js';
import jsonwebtoken from 'jsonwebtoken';

class GroupControllers {
    static async createGroup(req, res) {
        try {
            const { name, description, members_limit, streaming, pix_key, pay_day, account_email, account_password, searching_for_members } = req.body
            const { authorization } = req.headers
            const token = authorization.split(" ")[1];
            let tokenUserId = ""

            jsonwebtoken.verify(
                token,
                process.env.SECRET,
                async (err, decoded) => {
                    if (err) {
                        res.status(400).json(err)
                    }

                    tokenUserId = decoded.id;
                }
            );

            const members = [{ userId: tokenUserId, status: "", owner: true }]


            const group = await Group.create({
                name, description, members, streaming, members_limit, owner: tokenUserId, pix_key, pay_day, account_email, account_password, searching_for_members
            })

            res.status(201).json({ id: group.id })
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async getAllGroups(req, res) {
        try {
            const groups = await Group.find().select("members").select("name").select("owner").select("streaming")

            await Promise.all(groups.map(async group => {
                const membersArrObj = []

                group.members.forEach(member => {
                    membersArrObj.push({ _id: member.userId})
                })
                // for (let j = 0; j < group.members.length; j++) {
                //     //groups[i].members[j].avatar_url = (await User.findById(groups[i].members[j].userId).select("avatar_url")).avatar_url
                //     membersArrObj.push({ _id: group.members[j].userId })
                // }


                const newMembers = await User.find({ $or: [...membersArrObj] }).select("avatar_url")
                group.members = newMembers

                const streamingData = await Streaming.findById(group.streaming.streamingId)
                group.streaming = {name: streamingData.name, image: streamingData.image, plan: streamingData.plans.find(item => item.name === group.streaming.plan)}
                
                
            }))
                
            res.status(200).json(groups)
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

    static async join(req, res) {
        try {
            const { groupIp, userId } = req.body

            const group = await Group.findById(groupIp)

            const members = [...group.members, {
                userId,
                status: "pending"
            }]

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