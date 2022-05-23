import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router
    // .get('/user', UserController.listarUsers)    
    // .get('/users/:id', UserController.listarUsersPorId)
    .post('/users/register', UserController.register)
    .post('/users/sing_in', UserController.signIn)
    // .put('/users/:id', UserController.alterarUsers)
    // .delete('/users/:id', UserController.excluirUsers)

export default router;