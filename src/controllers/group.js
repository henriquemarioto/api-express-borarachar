import Group from '../models/group.js'
import User from '../models/user.js';
import Streaming from '../models/streaming.js';
import jsonwebtoken from 'jsonwebtoken';

class GroupControllers {
    static async createGroup(req, res) {
        try {
            const { name, description, members_limit, streaming, pix_key, pay_day, account_email, account_password, searching_for_members } = req.body

            const members = [{ userId: req.userId, status: "", owner: true }]


            const group = await Group.create({
                name, description, members, streaming, members_limit, owner: req.userId, pix_key, pay_day, account_email, account_password, searching_for_members
            })

            res.status(201).json({ id: group.id })
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    static async getAllGroups(req, res) {
        try {
            const groups = await Group.find().select("members").select("name").select("owner").select("streaming").select("members_limit")
            await Promise.all(groups.map(async group => {
                
                group = await GroupControllers.filterGroupsData(group)
            }))
            
            //const filteredGroups = await GroupControllers.filterGroupsInfo(groups)
                
            res.status(200).json(groups)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    
    static async getGroupById(req, res) {
        try {
            const { id } = req.params
            const group = await Group.findById(id)

            
            const filteredGroup = await GroupControllers.allDataGroupId(group)

            res.json(filteredGroup)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async updateGroup(req, res) {
        try {
            const { id } = req.params
            const { name, description, members_limit, owner, pix_key, pay_day, account_email, account_password, searching_for_members } = req.body

            const groupUpdated = await Group.findByIdAndUpdate(id, {
                name, description, members_limit, owner, pix_key, pay_day, account_email, account_password, searching_for_members, updated_at: new Date(), new: true
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

    static async joinGroup(req, res) {
        try {
            const { userId } = req.body
            const { id } = req.params

            const group = await Group.findById(id)

            const isAreadyMember = group.members.find(item => item.userId === userId)

            if(isAreadyMember){
                return res.status(400).json({error: "Usuário ja faz parte desse grupo"})
            }

            //Se estiver cheio
            if (group.members.length >= group.members_limit){
                return res.status(400).json({error: "Grupo cheio"})
            }

            const members = [...group.members, {
                userId,
                status: "pending",
                owner: false
            }]

            let searching_for_members = true
            //Se encheu depois que o membro entrou
            if (members.length >= group.members_limit){
                searching_for_members = false
            }
            
            const groupUpdated = await Group.findByIdAndUpdate(id, { members, searching_for_members }, {
                returnDocument: "after"
            })

            res.status(201).json(groupUpdated)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async exitGroup(req, res) {
        try {
            const { userId } = req.body
            const { id } = req.params

            const group = await Group.findById(id)

            if((userId === group.owner || userId === group.members.find(item => item.userId === userId)) && group.members.length > 1){
                return res.status(400).json({error: "O dono não pode sair se o grupo tiver membros"})
            }

            const members = group.members.filter(item => item.userId !== userId)

            if(!members.length){
                await Group.findByIdAndDelete(id)
            }
            else{
                await Group.findByIdAndUpdate(id, { members }, {
                    returnDocument: "after"
                })
            }

            res.status(201).json({})

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async filterGroupsData(group){
        const membersArrObj = []
    
        group.members.forEach(member => {
            membersArrObj.push({ _id: member.userId })
        })
    
        const newMembers = await User.find({ $or: [...membersArrObj] }).select("avatar_url")
        group.members = newMembers
    
        
        const streamingData = await Streaming.findById(group.streaming.streamingId)
        group.streaming = { name: streamingData.name, image: streamingData.image, plan: streamingData.plans.find(item => item.name === group.streaming.plan) }
        
        return group
    }

    static async allDataGroupId(group){
        const membersArrObj = group.members.map(member => {return {_id: member.userId }})

        group.members = (await User.find({ $or: [...membersArrObj] }).select("avatar_url").select("name").select("phone")).map((item, i) => {
            const memberInfo = { ...group.members[i], ...item._doc }
            delete memberInfo._id
            return memberInfo
        })

        const streamingData = await Streaming.findById(group.streaming.streamingId)
        group.streaming = { name: streamingData.name, image: streamingData.image, plan: streamingData.plans.find(item => item.name === group.streaming.plan) }

        return group
    }
}

export default GroupControllers