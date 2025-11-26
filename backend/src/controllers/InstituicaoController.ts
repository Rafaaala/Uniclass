import type { Request, Response } from "express";
import type { InstituicaoCreateInput, LocalCreateInput } from "../dtos/instituicao/InstituicaoCreateInput.ts";
import InstituicaoService from "../services/InstituicaoService.ts";
import CustomError from "../middlewares/CustomError.ts";
import type { ParamsDictionary } from 'express-serve-static-core';
import type { InstituicaoUpdateInput, LocalUpdateInput } from "../dtos/instituicao/InstituicaoUpdateInput.ts";


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