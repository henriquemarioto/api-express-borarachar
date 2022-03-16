import jsonwebtoken from "jsonwebtoken";

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