import type { Request, Response } from "express";
import type { InstituicaoCreateInput } from "../dtos/instituicao/InstituicaoCreateInput.js";
import InstituicaoService from "../services/InstituicaoService.js";
import CustomError from "../middlewares/CustomError.js";
import type { ParamsDictionary } from 'express-serve-static-core';
import type { InstituicaoUpdateInput } from "../dtos/instituicao/InstituicaoUpdateInput.js";

interface InstituicaoParams {
    id: string;
}

interface RequestWithId extends Request {
    params: {
        id: string;
    } & ParamsDictionary; // Combina com o tipo ParamsDictionary
}

class InstituicaoController {

    // POST
    async create(req: Request, res: Response): Promise<void>{

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
    async getById(req: RequestWithId, res: Response): Promise<void>{
        try{
            const { id } = req.params;

            const instituicao = InstituicaoService.getInstituicaoById(id);

            // response http de sucesso 200 OK
            res.status(201).json(instituicao);
        }
        catch(error){
            this.handleError(res, error);
        }
    }
    // GET
    async getAll(req: Request, res: Response): Promise<void>{
        try{
            const instituicoes = InstituicaoService.getAllInstituicao();

            // response http de sucesso 200 OK mesmo com array vazio([])
            res.status(200).json(instituicoes);
        }
        catch(error){
            this.handleError(res, error);
        }
    }
    // PATCH
    async update(req: RequestWithId, res: Response): Promise<void>{
        try{
            const { id } = req.params;
            const inputData: InstituicaoUpdateInput = req.body;

            const updatedInstituicao = await InstituicaoService.updateInstituicaoById(id, inputData);
        }
        catch(error){
            this.handleError(res, error);
        }
    }
    // DELETE
    async delete(req: RequestWithId, res: Response): Promise<void>{
        try{
            const { id } = req.params;

            await InstituicaoService.deleteInstituicaoById(id);

            // response http de sucesso 204 NO CONTENT
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