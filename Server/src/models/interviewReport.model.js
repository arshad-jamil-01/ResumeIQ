import mongoose from "mongoose";


//======== technicalQuestion ==========
const technoicalQuestionSchema = new mongoose.Schema({
question:{
    type:String,
    required:[true, "Technical question is required"]
},
intention:{
    type:String,
    required:[true, "intention is required"]
},
answer:{
    type:String,
    required:[true, "answer is required"]
}
},{_id:false});


//===========  behavioralQuestionSchema =========
const behavioralQuestionSchema = new mongoose.Schema({
question:{
    type:String,
    required:[true, "behaviral question is required"]
},
intention:{
    type:String,
    required:[true, "intention is required"]
},
answer:{
    type:String,
    required:[true, "answer is required"]
}
},{_id:true});


//====== skilss gap schema ======
 const  skillGapsSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true, "skills is required"]
    },
    severity:{
        type:String,
        enum:["low", "medium", "high"],
        required:[true, "Severity is required"]
    }
 },{
    _id:false
 })


 // ==== prepration plan schema =====
 const preprationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true, "day is required"]
    },
    focus:{
        type:String,
        required:[true, "Focus is required"]
    },
    task:[{
        type:String,
        required:[true, "task is required"]
    }]
 })


//======= InterviewSchema ========
const InterviewSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true, "job description is required"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matcheScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestion:[technoicalQuestionSchema],
    behavioralQuestionSchema:[behavioralQuestionSchema],
    skillGapsSchema:[skillGapsSchema],
    preprationPlanSchema:[preprationPlanSchema]
    

},{
    timestamps:true
})

const InterviewReportModel = mongoose.model("InterviewReportModel", InterviewSchema)
export default InterviewReportModel

