import express from "express";
import { loginUser, registerUser, adminLogin } from "../controllers/userController.js";
// import { authenticateToken } from "../middleware/utilities.js"

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/admin", adminLogin);
// userRouter.post("/register",authenticateToken, registerUser);

export default userRouter;