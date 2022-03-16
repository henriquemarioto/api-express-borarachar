import jsonwebtoken from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    try {
        const { authorization } = req.headers

        const [type, token] = authorization.split(" ")

        if(!token){
            res.status(400).json({error: "Missing token"})
        }

        jsonwebtoken.verify(token, process.env.SECRET, (err, decoded) => {
            if(err){
                return res.status(401).send({error: "Token invalid"})
            }

            req.userId = decoded.id
            return next()
        })
    } catch (error) {
        res.status(500).json(error)
    }
}