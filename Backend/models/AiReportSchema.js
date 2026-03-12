import mongoose from "mongoose";
import { string } from "zod";


// SUB SCHEMA's: 
const technicalQuestionsSchema=new mongoose.Schema({

    Question:{
        type:String,
        required:[true,"Question is requireed"]
    },
    Intention:{
        type:String,
        required:[true,"Intention is required"]
    }
    ,
    Answer:{
        type:String,
        required:[true,"Answer is requireed"]
    }
},{
    _id:false
})

const behavioralQuestionsSchema=new mongoose.Schema({
    Question:{
        type:String,
        required:[true,"Question is requireed"]
    },
    Intention:{
        type:String,
        required:[true,"Intention is required"]
    }
    ,
    Answer:{
        type:String,
        required:[true,"Answer is requireed"]
    }
},{
    _id:false
})

const skillGapsSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill name is required "]
    },
    severity:{
        type:String,
        enum:["High","Medium","Low"]
    }
},{
    _id:false
})


const preperationPlaneSchema=new mongoose.Schema({
    Day:{
        type:Number,
        required:[true,"Day number is required"]
    },
    Focus:{
        type:String,
        required:[true,"focused skill is required"]
    },
    Tasks:[{
        type:String,
        required:[true,"tasks are required "]
    }]
},{
    _id:false
})



// MAIN REPORT SCHEMA;
const AiReportSchema = mongoose.Schema({
    User:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
  // User's input  details;
  selfDescription: {
    type: String,
  },
  Resume: {
    type: String,
  },
  jobDescription: {
    type: String,
    required: [true,"job description is strickly required for the report"],
  },

  // Ai report details :
  jobTittle:{
    type:String,
    required:true
  },

  technicalQuestions: [technicalQuestionsSchema],

  behavioralQuestions: [behavioralQuestionsSchema],

  skillGaps: [skillGapsSchema],

  preperationPlane: [preperationPlaneSchema],

  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  }
});


const AiReportModel=mongoose.model("AiReport",AiReportSchema);
export default AiReportModel;