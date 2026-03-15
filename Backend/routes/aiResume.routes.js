import {Router} from  "express"
import { isLogedIn } from "../Middlewares/isLogedIn.middleware.js";
import { aiResumeController } from "../controllers/aiResume.controllers.js";
const aiResumerouter=Router()

aiResumerouter.get("/generateResume/:id",isLogedIn,aiResumeController)

export default aiResumerouter;