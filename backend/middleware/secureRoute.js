import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'

export const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "not authorized" });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(403).json({ message: "invalid token" });
        }

        const user = await User.findById(verified.userId).select("-password");
        if (!user) {
            return res.status(403).json({ message: "user not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "internal server error from secure route" });
    }
}