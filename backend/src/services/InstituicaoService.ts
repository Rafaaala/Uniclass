import InstituicaoRepository from '../repositories/InstituicaoRepository.js';
import type { InstituicaoResponse } from "../dtos/instituicao/InstituicaoResponse.js";

import CustomError from '../middlewares/CustomError.js';
import type { InstituicaoCreateInput } from '../dtos/instituicao/InstituicaoCreateInput.js';
import type { InstituicaoUpdateInput } from '../dtos/instituicao/InstituicaoUpdateInput.js';
import type { Instituicao } from '../dtos/instituicao/Instituicao.dto.js';

class InstituicaoService {

    async createInstituicao(data: InstituicaoCreateInput): Promise<InstituicaoResponse> {

        // tratando campos nulos
        if (!data.nome) {
            throw new CustomError("O nome da instituição é obrigatório.", 400);
        }
        if (!data.logoUrl) {
            throw new CustomError("O Logo da instituição é obrigatório.", 400);
        }
        if (!data.mapaUrl) {
            throw new CustomError("O mapa da instituição é obrigatório.", 400);
        }

        // chama o repository para persistir a nova instituicao
        const novaInstituicao = await InstituicaoRepository.createInstituicao(data)

        return {
            instituicaoId: novaInstituicao.instituicaoId,
            nome: novaInstituicao.nome,
            logoUrl: novaInstituicao.logoUrl,
            mapaUrl: novaInstituicao.mapaUrl
        }
    }

    async getInstituicaoById(id: string): Promise<InstituicaoResponse> {

        // chama repositorio para obter dados
        const instituicao = await InstituicaoRepository.getInstituicaoById(id);

        // se nao houverem dados, lança um erro 404
        if (!instituicao) {
            throw new CustomError(`Instituição com ID ${id} não encontrada.`, 404);
        }

        // mapeia o resultado do repository para o DTO de output
        const response: InstituicaoResponse = {
            instituicaoId: instituicao.instituicaoId,
            nome: instituicao.nome,
            logoUrl: instituicao.logoUrl,
            mapaUrl: instituicao.mapaUrl,
        }

        return response;
    }

    async getAllInstituicao(): Promise<InstituicaoResponse[]> {
        const instituicoes: Instituicao[] = await InstituicaoRepository.getAllInstituicao();

        // tratativa de erro caso a lista de instituicoes seja vazia
        if(instituicoes.length === 0){
            throw new CustomError("Nenhuma instituicao cadastrada para ser listada.", 404)
        }

        // mapeando o array do repositorio para o array de response
        const response: InstituicaoResponse[] = instituicoes.map(doc => ({
            instituicaoId: doc.instituicaoId,
            nome: doc.nome,
            logoUrl: doc.logoUrl,
            mapaUrl: doc.mapaUrl,
        }));

        return response;
    }
    
    async updateInstituicaoById(id: string, data: InstituicaoUpdateInput): Promise<InstituicaoResponse> {

        // verifica se dados foram fornecidos no input
        if (Object.keys(data).length === 0) {
            throw new CustomError("Nenhum campo fornecido para atualização.", 400);
        }

        // persiste os campos editados no repositorio
        const updatedInstituicao = await InstituicaoRepository.updateInstituicaoById(id, data);

        // se nao houverem dados, lança um erro 404
        if (!updatedInstituicao) {
            throw new CustomError(`Instituição com ID ${id} não encontrada.`, 404);
        }

        const response: InstituicaoResponse = {
            instituicaoId: updatedInstituicao.instituicaoId,
            nome: updatedInstituicao.nome,
            logoUrl: updatedInstituicao.logoUrl,
            mapaUrl: updatedInstituicao.mapaUrl,
        };

        return response;
    }

    async deleteInstituicaoById(id: string): Promise<boolean> {
        // chama repositorio para obter dados
        const instituicao = await InstituicaoRepository.getInstituicaoById(id);

        // se nao houverem dados, lança um erro 404
        if (!instituicao) {
            throw new CustomError(`Instituição com ID ${id} não encontrada.`, 404);
        }

        await InstituicaoRepository.deleteInstituicaoById(id)

        return true;
    }
}
export default new InstituicaoService();