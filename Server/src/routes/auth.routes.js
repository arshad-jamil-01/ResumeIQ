import express from "express";
import {registerUserController,loginUserController} from "../controllers/auth.controller.js"

const authRouter = express.Router();

// register routes 
authRouter.post("/register",registerUserController)

//login routes
authRouter.post("/login",loginUserController)


export default authRouter;