import jwt from 'jsonwebtoken'
import { ErrorHandler } from "../utils/utility.js";

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies["game-app"];
        if (!token) {
            return next(new ErrorHandler("Please login to access this route", 401))
        }

        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeData._id;
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

    next();
}


export { authenticate }