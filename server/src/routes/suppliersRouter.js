import express from "express";
import SuppliersController from "../controllers/suppliersController.js";
import Security from "../config/security.js";

const router = express.Router();

router
    .get("/suppliers", SuppliersController.listarSuppliers)
    .get("/suppliers/search", SuppliersController.listarSuppliersPorTag)
    .get("/suppliers/search/localization", SuppliersController.listarSuppliersPorLatitudeLongitude)
    .get("/suppliers/:id", SuppliersController.listarSuppliersPorId)
    .post("/suppliers", Security.isAuthenticated, Security.isAdmin, SuppliersController.cadastrarSuppliers)
    .put("/suppliers/:id", Security.isAuthenticated, Security.isAdmin, SuppliersController.alterarSuppliers)
    .delete("/suppliers/:id", Security.isAuthenticated, Security.isAdmin, SuppliersController.excluirSuppliers)

export default router;