import {Router} from  "express"
import { isLogedIn } from "../Middlewares/isLogedIn.middleware.js";
import { aiResumeController, getAllTemplatesController } from "../controllers/aiResume.controllers.js";
const aiResumerouter=Router()

aiResumerouter.post("/generateResume/:id",isLogedIn,aiResumeController)
aiResumerouter.get("/allTemplates",isLogedIn,getAllTemplatesController)
export default aiResumerouter;