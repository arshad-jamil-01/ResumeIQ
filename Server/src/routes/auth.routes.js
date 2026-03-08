import express from "express";
import {registerUserController,loginUserController, logoutUserController} from "../controllers/auth.controller.js"

const authRouter = express.Router();

//===== register routes =====
authRouter.post("/register",registerUserController)

//===== login routes =====
authRouter.post("/login",loginUserController)

//===== Logout =====
authRouter.get("/logout",logoutUserController)


export default authRouter;