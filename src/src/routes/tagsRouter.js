import express from "express";
import TagController from "../controllers/tagsController.js";

const router = express.Router();

router
    .get('/tags', TagController.listarTags)
    .get('/tags/search', TagController.listarLivrosPorTag)
    .get('/tags/:id', TagController.listarTagPorId)
    .post('/tags', TagController.cadastrarTag)
    .put('/tags/:id', TagController.alterarTag)
    .delete('/tags/:id', TagController.excluirTag)

export default router;