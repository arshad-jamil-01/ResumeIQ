import express from "express";
import {registerUserController} from "../controllers/auth.controller.js"

const authRouter = express.Router();

// register routes 
authRouter.post("/register",registerUserController)


export default authRouter;