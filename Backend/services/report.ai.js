
import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";


const aiReportResponseSchema = {
  type: "object",
  properties: {
    matchScore: {
      type: "number",
      description: "this will  be indicaing he score of the user from 1-100 based on the current capabilities and skills of the user and the skills and abilities required for the user targe job "
    },
    jobTittle: {
      type: "string",
      description: "The title of the job which user is seeking for "
    },
    technicalQuestions: {
      type: "array",
      description: "It will contain the technical questions that an intterviewer can ask from user related to the targeted job including questions , the motive of inerviewer behind ansking the question and answer  suggestions",
      items: {
        type: "object",
        properties: {
          Question: {
            type: "string",
            description: "This will be the technical question that an interviwer can ask from the user based on his a target job"
          },
          Intention: {
            type: "string",
            description: "the intention will describe the intention or mottivve of the interviewer behind the question he asked from the user "
          },
          Answer: {
            type: "string",
            description: "it will describe the suggestions for the user related o the question that what  aproach the user can follow and what points to  cover "
          }
        },
        required: ["Question", "Intention", "Answer"]
      }
    },
    behavioralQuestions: {
      type: "array",
      description: "this will contain the behavioral questions that an intterviewer can ask from user related to the targeted job including questions , the motive of inerviewer behind the question and aswer suggestions  ",
      items: {
        type: "object",
        properties: {
          Question: {
            type: "string",
            description: "This will be the behavioral question that an interviwer can ask from the user"
          },
          Intention: {
            type: "string",
            description: "the intention will describe the intention or mottivve of the interviewer behind the question he asked from the user "
          },
          Answer: {
            type: "string",
            description: "it will describe the suggestions for the user related o the question that what  aproach the user can follow and what points to  cover "
          }
        },
        required: ["Question", "Intention", "Answer"]
      }
    },
    skillGaps: {
      type: "array",
      description: "this  will contain the skills that  the user dont have in its resume and descripion and which he should learn  and the severity of the skill based on how quick the user can learn it",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string",
            description: "The skill that is no presentt in the resume of the user and which he should learn based on the job he is seeking for ."
          },
          severity: {
            type: "string",
            enum: ["High", "Medium", "Low"],
            description: "severity will describe the severity of te skill tha user can learn ,it must  be one of them [high ,medium ,low] if he can learn in short time it will be low and if it will take some time it will be medium and if i will take much more time then it will be high "
          }
        },
        required: ["skill", "severity"]
      }
    },
    preperationPlane: {
      type: "array",
      items: {
        type: "object",
        properties: {
          Day: {
            type: "number",
            description: "the number ,specify the day number from 1 "
          },
          Focus: {
            type: "string",
            description: "the topic ,point or skill the user should focus on that day"
          },
          Tasks: {
            type: "array",
            items: { type: "string" },
            description: "the array of strings which will contain the tasks that user will perform on that day according to the focus topic of that day"
          }
        },
        required: ["Day", "Focus", "Tasks"]
      }
    }
  },
  required: ["matchScore", "jobTittle", "technicalQuestions", "behavioralQuestions", "skillGaps", "preperationPlane"]
};

const ai = new GoogleGenAI({key:process.env.GEMINI_API_KEY});

const generateAireport=async(selfDescription,resumeText,targetJobDescription)=>{
// const jsonSchema = zodToJsonSchema(AiReportSchema, {
//   name: "AiReportSchema",
//   allRefs: true,       // <-- inline nested objects
//   target: "jsonSchema7" // optional but recommended
// });

// console.log(JSON.stringify(jsonSchema, null, 2));
console.log("getting the data ...")
const prompt = `
Generate an interview report.

Return ONLY valid JSON.
Do not include explanations.
Follow the provided json schema strictly.
selfDescription: ${selfDescription}
resumeText: ${resumeText}
targetJobDescription: ${targetJobDescription}
`;
const response=await ai.models.generateContent({
    model:"gemini-3-flash-preview",
    contents:prompt,
    config:{
responseMimeType:"application/json",
responseSchema: aiReportResponseSchema
    }


}
)
console.log(JSON.parse(response.text))
 return JSON.parse(response.text)

}

export default  generateAireport;