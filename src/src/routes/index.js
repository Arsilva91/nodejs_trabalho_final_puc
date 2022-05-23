import express from "express";
import tags from "./tagsRouter.js"
import suppliers from "./suppliersRouter.js";
import users from "./usersRouter.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

let checkToken = (req, res, next) => {
    let authToken = req.headers["authorization"] 
    if (!authToken) {
        res.status(401).json({ message: 'Token de acesso requerida' }) }
    else {
        let token = authToken.split(' ')[1] 
        req.token = token
    }    
    jsonwebtoken.verify(req.token, process.env.SECRET_KEY, (err, decodeToken) => { if (err) {
        res.status(401).json({ message: 'Acesso negado'})
        return
    }
        req.usuarioId = decodeToken.id 
            next()
    }) 
}

const routes = (app) => {
    app.use(        
        express.json(),
        users,
        checkToken,
        tags,    
        suppliers        
    )
}

export default routes;