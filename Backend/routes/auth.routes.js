import {Router} from  "express"
const authRouter=Router()
import { registerUserController,logineUserController ,logoutController} from "../controllers/auth.controllers.js";
import {isLogedIn} from "../Middlewares/isLogedIn.middleware.js"
import {getMeController} from "../controllers/auth.controllers.js"
authRouter.post("/register",registerUserController)
authRouter.post("/login",logineUserController)
authRouter.get("/logout",logoutController)
authRouter.get("/getMe",isLogedIn,getMeController)
export default authRouter ;
