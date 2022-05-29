import express from "express";
import TagController from "../controllers/tagsController.js";
import Security from "../config/security.js";

const router = express.Router();

router
    .get('/tags', Security.isAuthenticated, TagController.listarTags)
    .get('/tags/search', Security.isAuthenticated, TagController.listarLivrosPorTag)
    .get('/tags/:id', Security.isAuthenticated, TagController.listarTagPorId)
    .post('/tags', Security.isAuthenticated, Security.isAdmin, TagController.cadastrarTag)
    .put('/tags/:id', Security.isAuthenticated, Security.isAdmin,TagController.alterarTag)
    .delete('/tags/:id', Security.isAuthenticated, Security.isAdmin, TagController.excluirTag)

export default router;