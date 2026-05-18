import express from 'express'
import authUser from '../middleware/auth.middleware.js';
import interviewController from "../controllers/interview.controller.js"
import upload from "../middleware/file.middleware.js"

const interviewRouter = express.Router();



interviewRouter.post("/", authUser, upload.single("resume"), interviewController.generateInterviewReportController)


export default interviewRouter;