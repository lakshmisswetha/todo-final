import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { userValidationSchema } from "../utils/validationSchema";

interface IUser {
    _id: string;
    email: string;
    username: string;
    password: string;
}

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = userValidationSchema.parse(req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        if (await userModel.findOne({ email })) {
            return res.status(409).json({ status: false, error: "email already exists !" });
        } else {
            const newUser = await userModel.create({
                username,
                email,
                password: hashedPassword,
            });
            return res.status(201).json({ status: true, user: newUser, message: "User Created !" });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: error.errors,
            });
        }
        console.log(error);
        return res.status(500).json({ status: false });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = userValidationSchema.parse(req.body);
        const user: IUser | null = await userModel.findOne({ email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const payload = {
                    email: user.email,
                    id: user._id,
                    username: user.username,
                };
                const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as Secret, {
                    expiresIn: "2h",
                });
                return res.status(200).json({ status: true, token, message: "Login Successful" });
            } else {
                return res.status(401).json({ status: false, error: "Incorrect password" });
            }
        } else {
            return res.status(401).json({ status: false, error: "No user found" });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: error.errors,
            });
        }
        console.log(error);
        return res.status(500).json({ status: false });
    }
};
