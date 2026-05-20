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


// const interviewReportSchema = z.object({

//   // === macth score  ======
//   matchScore: z.number()
//         .min(0, "Match score cannot be less than 0")
//         .max(100, "Match score cannot be greater than 100")
//         .describe("The match score between the candidate's profile and the job description, indicating how well the candidate's qualifications align with the requirements of the job. A higher score indicates a better match."),

// //===== technical question =====
// technicalQuestion: z.array(
//   z.object({
//     question: z
//       .string()
//       .describe("The technical question that can be asked in the interview"),

//     intention: z
//       .string()
//       .describe("The intention of the interviewer behind asking this question"),

//     answer: z
//       .string()
//       .describe(
//         "How to answer this question, what points should be covered, and what approach to take"
//       ),
//   })
// ).describe(
//   "A list of technical questions that can be asked in the interview, along with the intention behind them and how to answer them effectively."
// ),

//   //======= behavioralQuestion ========
// behavioralQuestion: z.array(
//   z.object({
//     question: z
//       .string()
//       .describe("The behavioral question that can be asked in the interview"),

//     intention: z
//       .string()
//       .describe("The intention of the interviewer behind asking this question"),

//     answer: z
//       .string()
//       .describe(
//         "How to answer this question, what points should be covered, and what approach to take"
//       ),
//   })
// ).describe(
//   "A list of behavioral questions that can be asked in the interview, along with the intention behind them and how to answer them effectively."
// ),


//   // ===== skillGaps ======
//   skillGaps: z.array(z.object({
//     skill: z.string().describe("The specific skill that the candidate is lacking or needs improvement in"),
//     severity: z.enum(["low", "medium", "high"]).describe("The severity level of the skill gap, indicating how critical it is for the candidate to address this gap before the interview")
//   })).describe("A list of skill gaps that the candidate has, along with the severity level of each gap."),


//   //==== preparation plan ======
//   preparationPlan: z.array(z.object({
//     day: z.number().describe("The specific day of the preparation plan, indicating the timeline for the candidate's interview preparation"),
//     focus: z.string().describe("The main focus or theme for that day's preparation, such as a specific topic, skill, or aspect of the interview process that the candidate should concentrate on"),
//     task: z.array(z.string()).describe("A list of specific tasks or activities that the candidate should complete on that day to effectively prepare for the interview")
//   })).describe("A structured preparation plan for the candidate, outlining daily tasks and focus areas to help them effectively prepare for their interview.")

// });



//   async function generateInterviewReport({resume, selfDescription, jobDescription }){

// const prompt = `
// You are an expert interview preparation assistant.

// Analyze the candidate profile and return ONLY valid JSON.

// Return data in this EXACT structure:

// {
//   "matchScore": 0,
//   "technicalQuestion": [
//     {
//       "question": "",
//       "intention": "",
//       "answer": ""
//     }
//   ],
//   "behavioralQuestion": [
//     {
//       "question": "",
//       "intention": "",
//       "answer": ""
//     }
//   ],
//   "skillGaps": [
//     {
//       "skill": "",
//       "severity": "low"
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "",
//       "task": [""]
//     }
//   ]
// }

// Instructions:
// - Return ONLY pure JSON
// - Do not return markdown
// - Do not wrap JSON inside backticks
// - Do not stringify arrays
// - Do not stringify objects
// - technicalQuestion must be an array of objects
// - behavioralQuestion must be an array of objects
// - skillGaps must be an array of objects
// - preparationPlan must be an array of objects
// - severity value must only be: "low", "medium", or "high"
// - Generate exactly 5 technical questions
// - Generate exactly 3 behavioral questions
// - Generate a complete 7 day preparation plan
// - Each preparationPlan object must contain:
//   - day
//   - focus
//   - task (array of strings)

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}
// `;

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         //model: "gemini-2.0-flash",
//         contents:prompt,
//         config:{
//           responseMimeType:"application/json",
//           responseSchema: zodToJsonSchema(interviewReportSchema)
//         }
//     });

//   //   return JSON.parse(response.text)
//   //   //console.log(JSON.parse(response.text))


// const parsedData = JSON.parse(response.text);
// console.log(parsedData)

// return parsedData;

// }

// export default generateInterviewReport;



const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//     const prompt = `Generate an interview report for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
// `

const prompt = `
You are an expert interview preparation assistant.

Analyze the candidate profile and return ONLY valid JSON.

Generate:
- Match score out of 100
- 5 technical interview questions
- 3 behavioral interview questions
- Skill gaps with severity
- 7 day preparation plan

Rules:
- Return pure JSON only
- Do not return stringified JSON
- severity must be: low, medium, or high
- Keep answers concise and professional

Return ONLY valid JSON.

Do NOT return arrays like:
["question","abc","intention","xyz"]

Return proper JSON objects.

Example format:

{
  "match_score":90,

  "technical_interview_questions":[
    {
      "question":"...",
      "intention":"...",
      "answer":"..."
    }
  ],

  "behavioral_interview_questions":[
    {
      "question":"...",
      "intention":"...",
      "answer":"..."
    }
  ],

  "skill_gaps":[
    {
      "skill":"...",
      "severity":"low"
    }
  ],

  "preparation_plan":[
    {
      "day":1,
      "focus":"...",
      "task":["..."]
    }
  ]
}

Return ONLY JSON.
No markdown.
No explanation.
No backticks.
No extra text.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
        //model: "gemini-3-flash-preview",
         model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })
    
    console.log(JSON.parse(response.text))
    return JSON.parse(response.text)


}

export default generateInterviewReport;