import express from "express";
import { login, signup } from "../controller/userController";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/signup", signup);

export default router;
