import mongoose from "mongoose";


//======== technicalQuestion ==========
const technicalQuestionSchema = new mongoose.Schema({
question:{
    type:String,
    required:[true, "Technical question is required"]
},
intention:{
    type:String,
    //required:[true, "intention is required"]
    default:"Not provided"
},
answer:{
    type:String,
    //required:[true, "answer is required"]
     default:"Not provided"
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
    //required:[true, "intention is required"]
     default:"Not provided"
},
answer:{
    type:String,
    //required:[true, "answer is required"]
     default:"Not provided"
}
},{_id:false});


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
 const preparationPlanSchema = new mongoose.Schema({
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
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestion:[technicalQuestionSchema],
    behavioralQuestion:[behavioralQuestionSchema],
    skillGaps:[skillGapsSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
})

const InterviewReportModel = mongoose.model("InterviewReportModel", InterviewSchema)
export default InterviewReportModel

