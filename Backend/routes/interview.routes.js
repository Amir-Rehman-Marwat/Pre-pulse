import {Router} from  "express"
const interviewRouter=Router()
import { isLogedIn } from "../Middlewares/isLogedIn.middleware.js"
import { interviewReportController } from "../controllers/interview.controllers.js"
import {upload} from "../Middlewares/multer.middleware.js"

interviewRouter.post("/createReport",isLogedIn,upload.single("resume"),interviewReportController)

 export default interviewRouter 