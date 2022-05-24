import express from "express";
import SuppliersController from "../controllers/suppliersController.js";

const router = express.Router();

router
    .get("/suppliers", SuppliersController.listarSuppliers)
    .get("/suppliers/search", SuppliersController.listarSuppliersPorTag)
    .get("/suppliers/search/localization", SuppliersController.listarSuppliersPorLatitudeLongitude)
    .get("/suppliers/:id", SuppliersController.listarSuppliersPorId)
    .post("/suppliers", SuppliersController.cadastrarSuppliers)
    .put("/suppliers/:id", SuppliersController.alterarSuppliers)
    .delete("/suppliers/:id", SuppliersController.excluirSuppliers)

export default router;