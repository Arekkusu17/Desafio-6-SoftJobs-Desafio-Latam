import { Router } from "express";
import { myController } from "../controllers/controller.js";
import { verifyAndDecodeJWT } from "../middlewares/jwtMiddleware.js";
import { reportQuery } from "../middlewares/reportRequest.js";

const myRouter = Router();

myRouter.post("/usuarios", reportQuery, myController.createNewUser);
myRouter.post("/login", myController.loginUser);
myRouter.get("/usuarios", verifyAndDecodeJWT, myController.getUsers)


export default myRouter;
