import express from "express";
import tags from "./tagsRouter.js"
import suppliers from "./suppliersRouter.js";
import users from "./usersRouter.js";
import login from "./loginRouter.js"
import dotenv from 'dotenv';

dotenv.config();

const routes = (app) => {
    app.use(        
        express.json(),
        login,        
        users,
        tags,    
        suppliers        
    )
}

export default routes;