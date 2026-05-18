import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import {z} from "zod"
import { zodToJsonSchema } from "zod-to-json-schema";
//import { resume, selfDescription, jobDescription } from "./temp.js";


// async function main() {   // this code is right and wroking

//   const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY,
//   });

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Hello gemini! Explain what is Interview?",
//   });

//   console.log(response.text);
// }

// export default main;


const ai = new GoogleGenAI({
apiKey: process.env.GOOGLE_GENAI_API_KEY,
  });


const interviewReportSchema = z.object({

  // === macth score  ======
  matchScore: z.number()
        .min(0, "Match score cannot be less than 0")
        .max(100, "Match score cannot be greater than 100")
        .describe("The match score between the candidate's profile and the job description, indicating how well the candidate's qualifications align with the requirements of the job. A higher score indicates a better match."),
  technicalQuestion: z.object({
    question: z
      .string()
      .describe("The technical question that can be asked in the interview"),

    intention: z
      .string()
      .describe("The intention of the interviewer behind asking this question"),

    answer: z
      .string()
      .describe(
        "How to answer this question, what points should be covered, and what approach to take"
      ),
  }).describe("Technical questions that can be asked in the interview, along with the intention behind them and how to answer them effectively."),

  //======= behavioralQuestion ========
   behavioralQuestion: z.object({
    question: z
      .string()
      .describe("The technical question that can be asked in the interview"),

    intention: z
      .string()
      .describe("The intention of the interviewer behind asking this question"),

    answer: z
      .string()
      .describe(
        "How to answer this question, what points should be covered, and what approach to take"
      ),
  }).describe("Behavioral questions that can be asked in the interview, along with the intention behind them and how to answer them effectively."),


  // ===== skillGaps ======
  skillGaps: z.array(z.object({
    skill: z.string().describe("The specific skill that the candidate is lacking or needs improvement in"),
    severity: z.enum(["low", "medium", "high"]).describe("The severity level of the skill gap, indicating how critical it is for the candidate to address this gap before the interview")
  })).describe("A list of skill gaps that the candidate has, along with the severity level of each gap."),


  //==== preparation plan ======
  preparationPlan: z.array(z.object({
    day: z.number().describe("The specific day of the preparation plan, indicating the timeline for the candidate's interview preparation"),
    focus: z.string().describe("The main focus or theme for that day's preparation, such as a specific topic, skill, or aspect of the interview process that the candidate should concentrate on"),
    task: z.array(z.string()).describe("A list of specific tasks or activities that the candidate should complete on that day to effectively prepare for the interview")
  })).describe("A structured preparation plan for the candidate, outlining daily tasks and focus areas to help them effectively prepare for their interview.")

});



  async function generateInterviewReport({resume, selfDescription, jobDescription }){

 const prompt = `
You are an expert interview preparation assistant.

Analyze the candidate profile and generate:

1. Match score out of 100
2. 5 technical interview questions
3. 3 behavioral interview questions
4. Skill gaps with severity
5. 7 day preparation plan

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:prompt,
        config:{
          responseMimeType:"application/json",
          responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    });

    return JSON.parse(response.text)
  }

  export default  generateInterviewReport;