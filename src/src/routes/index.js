import express from "express";
import tags from "./tagsRouter.js"
import suppliers from "./suppliersRouter.js";

const routes = (app) => {
    app.use(
        express.json(),
        tags,    
        suppliers
    )
}

export default routes;