import jsonwebtoken from "jsonwebtoken";
import Group from "../models/group.js";

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

export const isRecurseOwner = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const recurseId = req.params.id;

    jwt.verify(
        token,
        process.env.SECRET,
        async (err, decoded) => {
            const userId = decoded.id;

            const recurse = await Group.findById(recurseId)

            if (!recurse) {
                return res.status(404).json({ error: "Recurse not found" });
            }

            if (recurse.owner !== userId) {
                return res.status(401).json({ error: "This user does not own this recurse" });
            }

            next();
        }
    );
};