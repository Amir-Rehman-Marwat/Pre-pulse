// NPM PACKAGES SECTION
import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser";
// CONFIGURATIONS SECTION
import dbConnection from "./configs/db.connection.js";
const app=express();
dbConnection()


// PARSER 
app.use(express.json())
app.use(cookieParser())

// ROUTERS
import authRouter from "./routes/auth.routes.js";
import userModel from "./models/user.model.js";

// routes 
app.use("/api/auth",authRouter)

const PORT=process.env.PORT || 4000
app.listen(PORT ,()=>{
    console.log("server listening at",PORT)
})
export default app 