import express from "express";
import SuppliersController from "../controllers/suppliersController.js";
import Security from "../config/security.js";

const router = express.Router();

router
    .get("/suppliers", Security.isAuthenticated, SuppliersController.listarSuppliers)
    .get("/suppliers/search", Security.isAuthenticated, SuppliersController.listarSuppliersPorTag)
    .get("/suppliers/search/localization", Security.isAuthenticated, SuppliersController.listarSuppliersPorLatitudeLongitude)
    .get("/suppliers/:id", Security.isAuthenticated, SuppliersController.listarSuppliersPorId)
    .post("/suppliers", Security.isAuthenticated, Security.isAdmin, SuppliersController.cadastrarSuppliers)
    .put("/suppliers/:id", Security.isAuthenticated, Security.isAdmin, SuppliersController.alterarSuppliers)
    .delete("/suppliers/:id", Security.isAuthenticated, Security.isAdmin, SuppliersController.excluirSuppliers)

export default router;