import jsonwebtoken from "jsonwebtoken";
import Group from "../models/group.js";
import User from "../models/user.js"

export const isAuthenticated = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if(!authorization){
            res.status(400).json({error: "Missing token"})
        }

        const [type, token] = authorization.split(" ")

        jsonwebtoken.verify(token, process.env.SECRET, (err, decoded) => {
            if(err){
                return res.status(401).send({error: "Invalid token"})
            }

            req.userId = decoded.id
            return next()
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const isGroupOwner = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const groupId = req.params.id;

    jsonwebtoken.verify(
        token,
        process.env.SECRET,
        async (err, decoded) => {
            const tokenUserId = decoded.id;

            const group = await Group.findById(groupId)
            const groupOwnerId = group.owner.toString()

            if (!group) {
                return res.status(404).json({ error: "Group not found" });
            }

            if (groupOwnerId !== tokenUserId) {
                return res.status(401).json({ error: "This user does not own this group" });
            }

            return next();
        }
    );
};

export const isUserOwner = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const userId = req.params.id;

        jsonwebtoken.verify(
            token,
            process.env.SECRET,
            async (err, decoded) => {
                const tokenUserId = decoded.id;

                const user = await User.findById(userId)
                const userDbId = user._id.toString()

                if (!user) {
                    return res.status(404).json({ error: "user not found" });
                }

                if (userDbId !== tokenUserId) {
                    return res.status(401).json({ error: "This token not is from this user" });
                }

                return next();
            }
        );
    } catch (error) {
        res.status(500).json(error)
    }
    
};