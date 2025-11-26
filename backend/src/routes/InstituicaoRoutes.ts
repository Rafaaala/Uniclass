import { Router, type Request, type Response } from 'express';
import InstituicaoController from '../controllers/InstituicaoController.ts';

const router = Router();

// ------- INSTITUICAO -----

// GET /instituicoes -> Buscar todas as instituições
router.get('/', (req: Request, res: Response) => {
    InstituicaoController.getAllInstituicao(req, res);
});
// GET /instituicoes/:id -> Buscar instituição por ID
router.get('/:id', (req: Request, res: Response) => {
    InstituicaoController.getInstituicaoById(req, res);
});
// POST /instituicoes -> Criar uma nova instituição
router.post('/', (req: Request, res: Response) => {
    InstituicaoController.createInstituicao(req, res);
});
// PATCH /instituicoes/:id -> Atualizar campos especificos por ID
router.patch('/:id', (req: Request, res: Response) => {
    InstituicaoController.updateInstituicao(req, res);
});
// DELETE /instituicoes/:id -> Excluir uma instituição por ID
router.delete('/:id', (req: Request, res: Response) => {
    InstituicaoController.deleteInstituicao(req, res);
});

// ------- LOCAL -----

// GET /instituicoes/:instituicaoId/locais -> Buscar todas os locais
router.get('/:instituicaoId/locais', (req: Request, res: Response) => {
    InstituicaoController.getAllLocal(req, res);
});
// GET /instituicoes/:instituicaoId/locais/:localId -> Buscar local por ID
router.get('/:instituicaoId/locais/:localId', (req: Request, res: Response) => {
    InstituicaoController.getLocalById(req, res);
});
// POST /instituicoes/:instituicaoId/locais -> Criar um novo local
router.post('/:instituicaoId/locais', (req: Request, res: Response) => {
    InstituicaoController.createLocal(req, res);
});
// PATCH /instituicoes/:instituicaoId/locais/:localId -> Atualizar campos especificos por ID
router.patch('/:instituicaoId/locais/:localId', (req: Request, res: Response) => {
    InstituicaoController.updateLocal(req, res);
});
// DELETE /instituicoes/:instituicaoId/locais/:localId -> Excluir um local por ID
router.delete('/:instituicaoId/locais/:localId', (req: Request, res: Response) => {
    InstituicaoController.deleteLocal(req, res);
});

// ------- USUARIO -----

// GET /instituicoes/:instituicaoId/usuarios -> Buscar todos os usuários da instituição
router.get('/:instituicaoId/usuarios', (req: Request, res: Response) => {
    InstituicaoController.getAllUsuarios(req, res);
});

// POST /instituicoes/:instituicaoId/usuarios -> Criar um novo usuário
router.post('/:instituicaoId/usuarios', (req: Request, res: Response) => {
    InstituicaoController.createUsuario(req, res);
});

// GET /instituicoes/:instituicaoId/usuarios/:usuarioId -> Buscar usuário por ID
router.get('/:instituicaoId/usuarios/:usuarioId', (req: Request, res: Response) => {
    InstituicaoController.getUsuarioById(req, res);
});

// PATCH /instituicoes/:instituicaoId/usuarios/:usuarioId -> Atualizar campos específicos
router.patch('/:instituicaoId/usuarios/:usuarioId', (req: Request, res: Response) => {
    InstituicaoController.updateUsuario(req, res);
});

// DELETE /instituicoes/:instituicaoId/usuarios/:usuarioId -> Excluir um usuário
router.delete('/:instituicaoId/usuarios/:usuarioId', (req: Request, res: Response) => {
    InstituicaoController.deleteUsuario(req, res);
});

// ------- EVENTO -----

// GET /instituicoes/:instituicaoId/eventos -> Buscar todos os eventos da instituição
router.get('/:instituicaoId/eventos', (req: Request, res: Response) => {
    InstituicaoController.getAllEventos(req, res);
});

// POST /instituicoes/:instituicaoId/eventos -> Criar um novo evento
router.post('/:instituicaoId/eventos', (req: Request, res: Response) => {
    InstituicaoController.createEvento(req, res);
});

// GET /instituicoes/:instituicaoId/eventos/:eventoId -> Buscar evento por ID
router.get('/:instituicaoId/eventos/:eventoId', (req: Request, res: Response) => {
    InstituicaoController.getEventoById(req, res);
});

// PATCH /instituicoes/:instituicaoId/eventos/:eventoId -> Atualizar campos específicos
router.patch('/:instituicaoId/eventos/:eventoId', (req: Request, res: Response) => {
    InstituicaoController.updateEvento(req, res);
});

// DELETE /instituicoes/:instituicaoId/eventos/:eventoId -> Excluir um evento
router.delete('/:instituicaoId/eventos/:eventoId', (req: Request, res: Response) => {
    InstituicaoController.deleteEvento(req, res);
});

// ------- SUGESTAO -----

// GET /instituicoes/:instituicaoId/sugestoes -> Buscar todas as sugestões da instituição
router.get('/:instituicaoId/sugestoes', (req: Request, res: Response) => {
    InstituicaoController.getAllSugestoes(req, res);
});

// POST /instituicoes/:instituicaoId/sugestoes -> Criar uma nova sugestão
router.post('/:instituicaoId/sugestoes', (req: Request, res: Response) => {
    InstituicaoController.createSugestao(req, res);
});

// GET /instituicoes/:instituicaoId/sugestoes/:sugestaoId -> Buscar sugestão por ID
router.get('/:instituicaoId/sugestoes/:sugestaoId', (req: Request, res: Response) => {
    InstituicaoController.getSugestaoById(req, res);
});

// PATCH /instituicoes/:instituicaoId/sugestoes/:sugestaoId -> Atualizar campos específicos
router.patch('/:instituicaoId/sugestoes/:sugestaoId', (req: Request, res: Response) => {
    InstituicaoController.updateSugestao(req, res);
});

// DELETE /instituicoes/:instituicaoId/sugestoes/:sugestaoId -> Excluir uma sugestão
router.delete('/:instituicaoId/sugestoes/:sugestaoId', (req: Request, res: Response) => {
    InstituicaoController.deleteSugestao(req, res);
});

export default router;