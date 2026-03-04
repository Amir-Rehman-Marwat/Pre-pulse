// NPM PACKAGES SECTION
import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser";
import cors  from "cors"
// CONFIGURATIONS SECTION
import dbConnection from "./configs/db.connection.js";
const app=express();
dbConnection()
app.use(cors({
    origin: "http://localhost:5173",
  credentials: true
}))

// import {selfDescription,resumeText,targetJobDescription} from "./services/temp.js"
// import generateAireport from "./services/report.ai.js";

// generateAireport(selfDescription,resumeText,targetJobDescription)
// PARSER 
app.use(express.json())
app.use(cookieParser())

// ROUTERS
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
// routes 
app.use("/api/auth",authRouter)
// http://localhost:3000/api/interview/createReport
app.use("/api/interview",interviewRouter)

const PORT=process.env.PORT || 4000
app.listen(PORT ,()=>{
    console.log("server listening at",PORT)
})
export default app 