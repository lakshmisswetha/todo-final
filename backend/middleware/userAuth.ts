import { Request, Response, NextFunction } from "express";
// import jwt, { Secret } from "jsonwebtoken";
const jwt = require("jsonwebtoken");
import { ObjectId } from "mongoose";

interface IUser {
    id: string | ObjectId;
    email: string;
    username: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearer = req?.headers?.authorization;
        if (!bearer) {
            return res.status(401).json({
                status: false,
                error: "No token",
            });
        }
        const token = bearer.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decodedToken) {
            req.user = decodedToken;
            next();
        } else {
            return res.status(401).json({ status: false, error: "Invalid Token" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
};
