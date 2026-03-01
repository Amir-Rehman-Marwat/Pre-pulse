import {Router} from  "express"
const authRouter=Router()
import { registerUserController } from "../controllers/auth.controllers.js";
import { logineUserController } from "../controllers/auth.controllers.js";

authRouter.post("/register",registerUserController)
authRouter.post("/login",logineUserController)


export default authRouter ;