import * as pdfParse from "pdf-parse";
import generateInterviewReport from "../services/ai.services.js";
import InterviewReportModel from "../models/interviewReport.model.js";
import formatInterviewReport from "../utils/FormateInterviewReport.js";

async function generateInterviewReportController(req, res){
    const resumeFile = req.file

 //const pdfData = await pdfParse.default(resumeFile.buffer);
 //const resumeContent = pdfData.text;

 const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()


    // const resumeContent = pdfparse(req.file.buffer)
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await  generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

     // 2. Convert AI → DB format (IMPORTANT FIX)
    const formattedData = formatInterviewReport(interviewReportByAi);


    const interviewReport = await InterviewReportModel.create({
        user: req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
       ...formattedData

    })
    res.status(201).json({
        message: "interview report  generated succefully",
        interviewReport
    })

};

export default generateInterviewReportController;