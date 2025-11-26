import SugestaoRepository from '../repositories/SugestaoRepository.ts';
import InstituicaoRepository from '../repositories/InstituicaoRepository.ts'; 
import UsuarioRepository from '../repositories/UsuarioRepository.ts';
import CustomError from '../middlewares/CustomError.ts';
import type { Sugestao } from '../dtos/sugestao/Sugestao.dto.ts';
import type { SugestaoCreateInput } from '../dtos/sugestao/SugestaoCreateInput.ts';
import type { SugestaoUpdateInput } from '../dtos/sugestao/SugestaoUpdateInput.ts';
import type { SugestaoResponse } from '../dtos/sugestao/SugestaoResponse.ts';

class SugestaoService {

    private async checkSugestaoInstituicao(instituicaoId: string, sugestaoId: string): Promise<Sugestao> {
        const sugestao = await SugestaoRepository.getSugestaoById(sugestaoId);

        if (!sugestao) {
            throw new CustomError(`Sugestão com ID ${sugestaoId} não encontrada.`, 404);
        }
        
        if (sugestao.instituicaoId !== instituicaoId) {
            throw new CustomError(`A Sugestão ${sugestaoId} não pertence à Instituição ${instituicaoId}. Acesso negado.`, 403);
        }

        return sugestao;
    }
    
    // POST: Cria uma nova sugestão (URL: /instituicoes/:instituicaoId/sugestoes)
    async createSugestao(instituicaoId: string, data: SugestaoCreateInput): Promise<SugestaoResponse> {
        
        if (!instituicaoId) throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
        if (!data.titulo) throw new CustomError("O título da sugestão é obrigatório.", 400);
        if (!data.usuarioId) throw new CustomError("O usuarioId do criador é obrigatório.", 400);
        if (!data.tipo) throw new CustomError("O tipo da sugestão é obrigatório.", 400);
        
        try {
            await InstituicaoRepository.getInstituicaoById(instituicaoId);
        } catch (error) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        try {
            const usuario = await UsuarioRepository.getUsuarioById(data.usuarioId);
            if (!usuario || usuario.instituicaoId !== instituicaoId) {
                throw new CustomError(`Usuário com ID ${data.usuarioId} não encontrado ou não pertence à esta instituição.`, 404);
            }
        } catch (e) {
            throw new CustomError(`Erro ao validar Usuário ${data.usuarioId}.`, 404);
        }

        const finalData = { ...data, instituicaoId };

        const novaSugestao = await SugestaoRepository.createSugestao(finalData);

        return this.mapToResponse(novaSugestao);
    }

    // GET: Busca uma sugestão por ID (URL: /instituicoes/:instituicaoId/sugestoes/:sugestaoId)
    async getSugestaoById(instituicaoId: string, sugestaoId: string): Promise<SugestaoResponse> {
        
        const sugestao = await this.checkSugestaoInstituicao(instituicaoId, sugestaoId);

        return this.mapToResponse(sugestao);
    }

    // GET ALL: Busca todas as sugestões de uma instituição (URL: /instituicoes/:instituicaoId/sugestoes)
    async getAllSugestoes(instituicaoId: string): Promise<SugestaoResponse[]> {
        
        try {
            await InstituicaoRepository.getInstituicaoById(instituicaoId);
        } catch (error) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        const sugestoes = await SugestaoRepository.getAllSugestoesByInstituicao(instituicaoId);

        if (sugestoes.length === 0) {
            throw new CustomError("Nenhuma sugestão cadastrada para esta instituição.", 404);
        }

        return sugestoes.map(s => this.mapToResponse(s));
    }

    // PATCH: Atualiza uma sugestão (URL: /instituicoes/:instituicaoId/sugestoes/:sugestaoId)
    async updateSugestaoById(instituicaoId: string, sugestaoId: string, data: SugestaoUpdateInput): Promise<SugestaoResponse> {
        
        if (Object.keys(data).length === 0) {
            throw new CustomError("Nenhum campo fornecido para atualização.", 400);
        }
        
        await this.checkSugestaoInstituicao(instituicaoId, sugestaoId);
        
        if (data.usuarioId) throw new CustomError("O campo 'usuarioId' não pode ser alterado.", 400);

        const updatedSugestao = await SugestaoRepository.updateSugestaoById(sugestaoId, data);

        if (!updatedSugestao) {
            throw new CustomError(`Falha na atualização da Sugestão ${sugestaoId}.`, 500);
        }

        return this.mapToResponse(updatedSugestao);
    }

    // DELETE: Exclui uma sugestão (URL: /instituicoes/:instituicaoId/sugestoes/:sugestaoId)
    async deleteSugestaoById(instituicaoId: string, sugestaoId: string): Promise<boolean> {
        
        await this.checkSugestaoInstituicao(instituicaoId, sugestaoId);

        const deleted = await SugestaoRepository.deleteSugestaoById(sugestaoId);
        
        if (!deleted) {
            throw new CustomError(`Falha na exclusão da Sugestão ${sugestaoId}.`, 500);
        }
        
        return true;
    }

    // Helper para mapeamento
    private mapToResponse(sugestao: Sugestao): SugestaoResponse {
        return {
            sugestaoId: sugestao.sugestaoId,
            instituicaoId: sugestao.instituicaoId,
            titulo: sugestao.titulo,
            descricao: sugestao.descricao,
            tipo: sugestao.tipo,
            status: sugestao.status,
            localizacao: sugestao.localizacao,
            fotoUrl: sugestao.fotoUrl,
            dataCriacao: sugestao.dataCriacao,
            usuarioId: sugestao.usuarioId,
        } as SugestaoResponse;
    }
}

export default new SugestaoService();