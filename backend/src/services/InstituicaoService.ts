import InstituicaoRepository from '../repositories/InstituicaoRepository.ts';
import type { InstituicaoResponse, LocalResponse } from "../dtos/instituicao/InstituicaoResponse.ts";

import CustomError from '../middlewares/CustomError.ts';
import type { InstituicaoCreateInput, LocalCreateInput } from '../dtos/instituicao/InstituicaoCreateInput.ts';
import type { InstituicaoUpdateInput, LocalUpdateInput } from '../dtos/instituicao/InstituicaoUpdateInput.ts';
import type { Instituicao, Local } from '../dtos/instituicao/Instituicao.dto.ts';

class InstituicaoService {

    // INSTITUICAO
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

    async getInstituicaoById(instituicaoId: string): Promise<InstituicaoResponse> {

        // chama repositorio para obter dados
        const instituicao = await InstituicaoRepository.getInstituicaoById(instituicaoId);

        // se nao houverem dados, lança um erro 404
        if (!instituicao) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        // mapeando o resultado do repository para o DTO de output
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
            configuracoes: doc.configuracoes
        }));
        
        return response;
    }
    
    async updateInstituicaoById(instituicaoId: string, data: InstituicaoUpdateInput): Promise<InstituicaoResponse> {

        // verifica se dados foram fornecidos no input
        if (Object.keys(data).length === 0) {
            throw new CustomError("Nenhum campo fornecido para atualização.", 400);
        }

        // persiste os campos editados no repositorio
        const updatedInstituicao = await InstituicaoRepository.updateInstituicaoById(instituicaoId, data);

        // se nao houverem dados, lança um erro 404
        if (!updatedInstituicao) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        const response: InstituicaoResponse = {
            instituicaoId: updatedInstituicao.instituicaoId,
            nome: updatedInstituicao.nome,
            logoUrl: updatedInstituicao.logoUrl,
            mapaUrl: updatedInstituicao.mapaUrl,
        };

        return response;
    }

    async deleteInstituicaoById(instituicaoId: string): Promise<boolean> {
        // chama repositorio para obter dados
        const instituicao = await InstituicaoRepository.getInstituicaoById(instituicaoId);

        // se nao houverem dados, lança um erro 404
        if (!instituicao) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        await InstituicaoRepository.deleteInstituicaoById(instituicaoId)

        return true;
    }

    // LOCAL
    async createLocal(instituicaoId: string, data: LocalCreateInput): Promise<LocalResponse>{

        // tratando campos nulos
        if (!instituicaoId) {
            throw new CustomError("O id da instituição é obrigatório", 400);
        }
        if (!data.nome) {
            throw new CustomError("O nome da instituição é obrigatório.", 400);
        }
        if (!data.tipo) {
            throw new CustomError("O tipo do local é obrigatório.", 400);
        }
        if (!data.bloco) {
            throw new CustomError("O bloco do local é obrigatório.", 400);
        }
        if (!data.coordenadas) {
            throw new CustomError("As coordenadas do local é obrigatório.", 400);
        }
        if (!data.mapaXY) {
            throw new CustomError("Os pontos X e Y do mapa é obrigatório.", 400);
        }
        if (!data.acessivel) {
            throw new CustomError("O status do local é obrigatório.", 400);
        }

        // chama o repository para persistir o novo local
        const novoLocal = await InstituicaoRepository.createLocal(instituicaoId, data);

        return {
            localId: novoLocal.localId,
            nome: novoLocal.nome,
            tipo: novoLocal.tipo,
            bloco: novoLocal.bloco,
            coordenadas: novoLocal.coordenadas,
            mapaXY: novoLocal.mapaXY,
            acessivel: novoLocal.acessivel
        } as LocalResponse

    }

    async getLocalByid(instituicaoId: string, localId: string): Promise<LocalResponse>{

        // verificando existencia da instituicao
        const instituicao = await InstituicaoRepository.getInstituicaoById(instituicaoId);

        if (!instituicao) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        // chama repositorio para obter dados
        const local = await InstituicaoRepository.getLocalById(instituicaoId, localId);

        // se nao houverem dados, lança um erro 404
        if (!local) {
            throw new CustomError(`Local com ID ${localId} não encontrado.`, 404);
        }

        // mapeando o resultado do repository para o DTO de output
        return {
            localId: local.localId,
            nome: local.nome,
            tipo: local.tipo,
            bloco: local.bloco,
            coordenadas: local.coordenadas,
            mapaXY: local.mapaXY,
            acessivel: local.acessivel
        } as LocalResponse
    }

    async getAllLocal(instituicaoId: string): Promise<Local[]>{

        // verificando existencia da instituicao
        const instituicao = await InstituicaoRepository.getInstituicaoById(instituicaoId);

        if (!instituicao) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        const locais: Local[] = await InstituicaoRepository.getAllLocal(instituicaoId);

        // tratativa de erro caso a lista de locais seja vazia
        if(locais.length === 0){
            throw new CustomError("Nenhum local cadastrado para ser listado.", 404)
        }

        // mapeando o array do repositorio para o array de response
        const response: LocalResponse[] = locais.map(doc => ({
            localId: doc.localId,
            nome: doc.nome,
            tipo: doc.tipo,
            bloco: doc.bloco,
            coordenadas: doc.coordenadas,
            mapaXY: doc.mapaXY,
            acessivel: doc.acessivel
        }));

        return response;
    }

    async updateLocalById(instituicaoId: string, localId: string, data: LocalUpdateInput): Promise<LocalResponse>{

        // verificando existencia da instituicao
        const instituicao = await InstituicaoRepository.getInstituicaoById(instituicaoId);

        if (!instituicao) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }


        // verifica se dados foram fornecidos no input
        if (Object.keys(data).length === 0) {
            throw new CustomError("Nenhum campo fornecido para atualização.", 400);
        }

        // chama repositorio para obter dados
        const local = await InstituicaoRepository.getLocalById(instituicaoId, localId);

        if (!local) {
            throw new CustomError(`Local com ID ${localId} não encontrado.`, 404);
        }

        // persiste os campos editados no repositorio
        const updatedLocal = await InstituicaoRepository.updataLocalById(instituicaoId, localId, data);

        // se nao houverem dados, lança um erro 404
        if (!updatedLocal) {
            throw new CustomError(`Local com ID ${instituicaoId} não encontrado.`, 404);
        }

        // mapeando o resultado do repository para o DTO de output
        return {
            localId: local.localId,
            nome: updatedLocal?.nome,
            tipo: updatedLocal.tipo,
            bloco: updatedLocal.bloco,
            coordenadas: updatedLocal.coordenadas,
            mapaXY: updatedLocal.mapaXY,
            acessivel: updatedLocal.acessivel
        } as LocalResponse
        
    }

    async deleteLocalById(instituicaoId: string, localId: string): Promise<boolean>{

        // verificando existencia da instituicao
        const instituicao = await InstituicaoRepository.getInstituicaoById(instituicaoId);

        if (!instituicao) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }


        // chama repositorio para obter dados
        const local = await InstituicaoRepository.getLocalById(instituicaoId, localId);

        // se nao houverem dados, lança um erro 404
        if (!local) {
            throw new CustomError(`Local com ID ${localId} não encontrado.`, 404);
        }

        await InstituicaoRepository.deleteLocalById(instituicaoId, localId);

        return true;
    }
}
export default new InstituicaoService();