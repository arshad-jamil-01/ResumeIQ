import express from "express";
import {registerUserController,loginUserController, logoutUserController, getMeController} from "../controllers/auth.controller.js"
import authUser from "../middleware/auth.middleware.js";

const authRouter = express.Router();

//===== register routes =====
authRouter.post("/register",registerUserController)

//===== login routes =====
authRouter.post("/login",loginUserController)

//===== Logout =====
authRouter.get("/logout",logoutUserController)

// ===== get the current user details api =====
authRouter.get("/get-me",authUser, getMeController)


export default authRouter;