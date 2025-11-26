import type { Request, Response } from "express";
import type { InstituicaoCreateInput, LocalCreateInput } from "../dtos/instituicao/InstituicaoCreateInput.ts";
import InstituicaoService from "../services/InstituicaoService.ts";
import CustomError from "../middlewares/CustomError.ts";
import type { InstituicaoUpdateInput, LocalUpdateInput } from "../dtos/instituicao/InstituicaoUpdateInput.ts";
import UsuarioService from "../services/UsuarioService.ts";
import type { UsuarioCreateInput } from "../dtos/usuario/UsuarioCreateInput.ts";
import type { UsuarioUpdateInput } from "../dtos/usuario/UsuarioUpdateInput.ts";
import EventoService from "../services/EventoService.ts";
import type { EventoUpdateInput } from "../dtos/evento/EventoUpdateInput.ts";
import type { EventoCreateInput } from "../dtos/evento/EventoCreateInput.ts";
import SugestaoService from "../services/SugestaoService.ts"; 
import type { SugestaoCreateInput } from "../dtos/sugestao/SugestaoCreateInput.ts";
import type { SugestaoUpdateInput } from "../dtos/sugestao/SugestaoUpdateInput.ts";


class InstituicaoController {

    // ------ INSTITUICAO ------

    // POST
    async createInstituicao(req: Request, res: Response): Promise<void>{

        try{
            // chamando o service com o inputDto
            const inputData: InstituicaoCreateInput = req.body;
            const novaInstituicao = await InstituicaoService.createInstituicao(inputData);

            // response http de sucesso 201 CREATED 
            res.status(201).json(novaInstituicao);
        }
        catch(error){
            this.handleError(res, error);
        }
    }

    // GET
    async getInstituicaoById(req: Request, res: Response): Promise<void>{
        try{
            const id = req.params.id;

            if (!id) {
                throw new CustomError("O ID da instituição é obrigatório.", 400);
            }

            const instituicao = await InstituicaoService.getInstituicaoById(id);

            // response http de sucesso 200 OK
            res.status(200).json(instituicao);
        }
        catch(error){
            this.handleError(res, error);
        }
    }
    // GET
    async getAllInstituicao(req: Request, res: Response): Promise<void>{
        try{
            const instituicoes = await InstituicaoService.getAllInstituicao();

            // response http de sucesso 200 OK mesmo com array vazio([])
            res.status(200).json(instituicoes);
        }
        catch(error){
            this.handleError(res, error);
        }
    }
    // PATCH
    async updateInstituicao(req: Request, res: Response): Promise<void>{
        try{
            const id = req.params.id;

            if (!id) {
                throw new CustomError("O ID da instituição é obrigatório.", 400);
            }

            const inputData: InstituicaoUpdateInput = req.body;

            const updatedInstituicao = await InstituicaoService.updateInstituicaoById(id, inputData);

            // response http de sucesso 200 OK
            res.status(200).json(updatedInstituicao);
        }
        catch(error){
            this.handleError(res, error);
        }
    }
    // DELETE
    async deleteInstituicao(req: Request, res: Response): Promise<void>{
        try{
            const id = req.params.id;

            if (!id) {
                throw new CustomError("O ID da instituição é obrigatório.", 400);
            }

            await InstituicaoService.deleteInstituicaoById(id);

            // response http de sucesso 204 NO CONTENT
            res.status(204).send();
        }
        catch(error){
            this.handleError(res, error);
        }
    }

    // ------ LOCAL ------

    // POST
    async createLocal(req: Request, res: Response): Promise<void>{
        try{

            const instituicaoId= req.params.instituicaoId;
            const inputData: LocalCreateInput = req.body;

            if (!instituicaoId) {
                throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
            }

            const novoLocal = await InstituicaoService.createLocal(instituicaoId, inputData);

            // response http de sucesso 201 CREATED 
            res.status(201).json(novoLocal);
        }
        catch(error){
            this.handleError(res, error);
        }
    }

    // GET
    async getLocalById(req: Request, res: Response): Promise<void>{
        try{
            const instituicaoId = req.params.instituicaoId;
            const localId = req.params.localId;

            if (!instituicaoId || !localId) {
                throw new CustomError("Os IDs da instituição e do local são obrigatórios.", 400);
            }

            const local = await InstituicaoService.getLocalByid(instituicaoId, localId);

            res.status(200).json(local);
        }
        catch(error){
            this.handleError(res, error);
        }
    }
    // GET
    async getAllLocal(req: Request, res: Response): Promise<void>{
        try{
            const instituicaoId = req.params.instituicaoId;

            if (!instituicaoId) {
                throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
            }

            const locais = await InstituicaoService.getAllLocal(instituicaoId);

            res.status(200).json(locais);
        }
        catch(error){
            this.handleError(res, error);
        }
    }
    // PATCH
    async updateLocal(req: Request, res: Response): Promise<void>{
        try{
            const instituicaoId = req.params.instituicaoId;
            const localId = req.params.localId;
            const inputData: LocalUpdateInput = req.body; 

            if (!instituicaoId || !localId) {
                throw new CustomError("Os IDs da instituição e do local são obrigatórios.", 400);
            }

            const updatedLocal = await InstituicaoService.updateLocalById(instituicaoId, localId, inputData);

            res.status(200).json(updatedLocal);
        }
        catch(error){
            this.handleError(res, error);
        }
    }
    // DELETE
    async deleteLocal(req: Request, res: Response): Promise<void>{
        try{
            const instituicaoId = req.params.instituicaoId;
            const localId = req.params.localId;

            if (!instituicaoId || !localId) {
                throw new CustomError("Os IDs da instituição e do local são obrigatórios.", 400);
            }

            await InstituicaoService.deleteLocalById(instituicaoId, localId);

            res.status(204).send();
        }
        catch(error){
            this.handleError(res, error);
        }
    }

    // ------ USUARIO ------

    async createUsuario(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId;
            const inputData: UsuarioCreateInput = req.body;

            if (!instituicaoId) {
                throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
            }

            const novoUsuario = await UsuarioService.createUsuario(instituicaoId, inputData);

            res.status(201).json(novoUsuario);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getUsuarioById(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 
            const usuarioId = req.params.usuarioId; 

            if (!instituicaoId || !usuarioId) {
                throw new CustomError("Os IDs da instituição e do usuário são obrigatórios.", 400);
            }

            const usuario = await UsuarioService.getUsuarioById(instituicaoId, usuarioId);

            res.status(200).json(usuario);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getAllUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 

            if (!instituicaoId) {
                throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
            }

            const usuarios = await UsuarioService.getAllUsuarios(instituicaoId);

            res.status(200).json(usuarios);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateUsuario(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 
            const usuarioId = req.params.usuarioId; 
            const inputData: UsuarioUpdateInput = req.body;

            if (!instituicaoId || !usuarioId) {
                throw new CustomError("Os IDs da instituição e do usuário são obrigatórios.", 400);
            }

            const updatedUsuario = await UsuarioService.updateUsuarioById(instituicaoId, usuarioId, inputData);

            res.status(200).json(updatedUsuario);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async deleteUsuario(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId;
            const usuarioId = req.params.usuarioId;

            if (!instituicaoId || !usuarioId) {
                throw new CustomError("Os IDs da instituição e do usuário são obrigatórios.", 400);
            }

            await UsuarioService.deleteUsuarioById(instituicaoId, usuarioId);

            res.status(204).send();
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // ------ EVENTO ------

    // POST /instituicoes/:id/eventos
    async createEvento(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; // Captura o ID da Instituição da URL
            const inputData: EventoCreateInput = req.body;

            if (!instituicaoId) {
                throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
            }

            const novoEvento = await EventoService.createEvento(instituicaoId, inputData);

            res.status(201).json(novoEvento);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /instituicoes/:id/eventos/:eventoId
    async getEventoById(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 
            const eventoId = req.params.eventoId; 

            if (!instituicaoId || !eventoId) {
                throw new CustomError("Os IDs da instituição e do evento são obrigatórios.", 400);
            }

            const evento = await EventoService.getEventoById(instituicaoId, eventoId);

            res.status(200).json(evento);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET ALL /instituicoes/:id/eventos
    async getAllEventos(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 

            if (!instituicaoId) {
                throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
            }

            const eventos = await EventoService.getAllEventos(instituicaoId);

            res.status(200).json(eventos);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PATCH /instituicoes/:id/eventos/:eventoId
    async updateEvento(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 
            const eventoId = req.params.eventoId; 
            const inputData: EventoUpdateInput = req.body;

            if (!instituicaoId || !eventoId) {
                throw new CustomError("Os IDs da instituição e do evento são obrigatórios.", 400);
            }

            const updatedEvento = await EventoService.updateEventoById(instituicaoId, eventoId, inputData);

            res.status(200).json(updatedEvento);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // DELETE /instituicoes/:id/eventos/:eventoId
    async deleteEvento(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId;
            const eventoId = req.params.eventoId;

            if (!instituicaoId || !eventoId) {
                throw new CustomError("Os IDs da instituição e do evento são obrigatórios.", 400);
            }

            await EventoService.deleteEventoById(instituicaoId, eventoId);

            res.status(204).send();
        } catch (error) {
            this.handleError(res, error);
        }
    }

// ------ SUGESTAO ------

    // POST /instituicoes/:id/sugestoes
    async createSugestao(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 
            const inputData: SugestaoCreateInput = req.body;

            if (!instituicaoId) {
                throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
            }

            const novaSugestao = await SugestaoService.createSugestao(instituicaoId, inputData);

            res.status(201).json(novaSugestao);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /instituicoes/:id/sugestoes/:sugestaoId
    async getSugestaoById(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 
            const sugestaoId = req.params.sugestaoId; 

            if (!instituicaoId || !sugestaoId) {
                throw new CustomError("Os IDs da instituição e da sugestão são obrigatórios.", 400);
            }

            const sugestao = await SugestaoService.getSugestaoById(instituicaoId, sugestaoId);

            res.status(200).json(sugestao);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET ALL /instituicoes/:id/sugestoes
    async getAllSugestoes(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 

            if (!instituicaoId) {
                throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
            }

            const sugestoes = await SugestaoService.getAllSugestoes(instituicaoId);

            res.status(200).json(sugestoes);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PATCH /instituicoes/:id/sugestoes/:sugestaoId
    async updateSugestao(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId; 
            const sugestaoId = req.params.sugestaoId; 
            const inputData: SugestaoUpdateInput = req.body;

            if (!instituicaoId || !sugestaoId) {
                throw new CustomError("Os IDs da instituição e da sugestão são obrigatórios.", 400);
            }

            const updatedSugestao = await SugestaoService.updateSugestaoById(instituicaoId, sugestaoId, inputData);

            res.status(200).json(updatedSugestao);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // DELETE /instituicoes/:id/sugestoes/:sugestaoId
    async deleteSugestao(req: Request, res: Response): Promise<void> {
        try {
            const instituicaoId = req.params.instituicaoId;
            const sugestaoId = req.params.sugestaoId;

            if (!instituicaoId || !sugestaoId) {
                throw new CustomError("Os IDs da instituição e da sugestão são obrigatórios.", 400);
            }

            await SugestaoService.deleteSugestaoById(instituicaoId, sugestaoId);

            res.status(204).send();
        } catch (error) {
            this.handleError(res, error);
        }
    }







    // tratamento de erro
    private handleError(res: Response, error: unknown): void {
        if (error instanceof CustomError) {
            res.status(error.status).json({
                message: error.message,
                status: error.status,
            });
        } 
        else {
            // lidando com erros inesperados(não previstos)
            console.error("Erro inesperado no Controller:", error);
            res.status(500).json({
                message: "Erro interno do servidor.",
                status: 500,
            });
        }
    }
}


export default new InstituicaoController();