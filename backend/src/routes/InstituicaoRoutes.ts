import { Router, type Request, type Response } from 'express';
import InstituicaoController from '../controllers/InstituicaoController.ts';

const router = Router();

// GET /instituicoes -> Buscar todas as instituições
router.get('/', (req: Request, res: Response) => {
    InstituicaoController.getAll(req, res);
});
// GET /instituicoes/:id -> Buscar instituição por ID
router.get('/:id', (req: Request, res: Response) => {
    InstituicaoController.getById(req, res);
});
// POST /instituicoes -> Criar uma nova instituição
router.post('/', (req: Request, res: Response) => {
    InstituicaoController.create(req, res);
});
// PATCH /instituicoes/:id -> Atualizar campos especificos por ID
router.patch('/:id', (req: Request, res: Response) => {
    InstituicaoController.update(req, res);
});
// DELETE /instituicoes/:id -> Excluir uma instituição por ID
router.delete('/:id', (req: Request, res: Response) => {
    InstituicaoController.delete(req, res);
});

export default router;