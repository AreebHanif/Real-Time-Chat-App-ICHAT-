import jwt from "jsonwebtoken"
import User from "../models/user.js"

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ msg: "Un-Authorized - no token provided" })

        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({ msg: "Unauthorized invalid token " })
        }
        const user = await User.findById(decoded._id).select("-password")
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        req.user = user
        next();
    } catch (error) {
        res.status(500).json({ msg: "Internal server error " })
    }
}
export default protectRoute