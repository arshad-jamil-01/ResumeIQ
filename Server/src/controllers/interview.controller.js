import * as pdfParse from "pdf-parse";
import generateInterviewReport from "../services/ai.services.js";
import InterviewReportModel from "../models/interviewReport.model.js";

async function generateInterviewReportController(req, res){
    const resumeFile = req.file

    const pdfData = await pdfParse.default(resumeFile.buffer);
    const resumeContent = pdfData.text;


    // const resumeContent = pdfparse(req.file.buffer)
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await  generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await InterviewReportModel.create({
        user: req.user.id,

    })

};


export {generateInterviewReportController};