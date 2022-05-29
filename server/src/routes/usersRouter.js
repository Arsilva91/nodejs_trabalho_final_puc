import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router
    // .get('/user', UserController.listarUsers)    
    // .get('/users/:id', UserController.listarUsersPorId)
    .post('/users', UserController.register)    
    // .put('/users/:id', UserController.alterarUsers)
    // .delete('/users/:id', UserController.excluirUsers)

export default router;