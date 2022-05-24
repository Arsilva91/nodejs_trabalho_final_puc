import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.post('/sign_in', UserController.signIn)    

export default router;