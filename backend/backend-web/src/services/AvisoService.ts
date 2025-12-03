import AvisoRepository from '../repositories/AvisoRepository.ts';
import InstituicaoRepository from '../repositories/InstituicaoRepository.ts'; 
import UsuarioRepository from '../repositories/UsuarioRepository.ts';
import CustomError from '../middlewares/CustomError.ts';
import type { Aviso } from '../dtos/aviso/aviso.dto.ts';
import type { AvisoCreateInput } from '../dtos/aviso/AvisoCreateInput.ts';
import type { AvisoUpdateInput } from '../dtos/aviso/AvisoUpdateInput.ts';
import type { AvisoResponse } from '../dtos/aviso/AvisoResponse.ts';

class AvisoService {

    // Helper para verificar existência do aviso E a pertinência à instituição.
    private async checkAvisoInstituicao(instituicaoId: string, avisoId: string): Promise<Aviso> {
        const aviso = await AvisoRepository.getAvisoById(avisoId);

        if (!aviso) {
            throw new CustomError(`Aviso com ID ${avisoId} não encontrado.`, 404);
        }
        
        if (aviso.instituicaoId !== instituicaoId) {
            throw new CustomError(`O Aviso ${avisoId} não pertence à Instituição ${instituicaoId}. Acesso negado.`, 403);
        }

        return aviso;
    }
    
    // POST: Cria um novo aviso (URL: /instituicoes/:instituicaoId/avisos)
    async createAviso(instituicaoId: string, data: AvisoCreateInput): Promise<AvisoResponse> {
        
        if (!instituicaoId) throw new CustomError("O ID da instituição é obrigatório na URL.", 400);
        if (!data.usuarioId) throw new CustomError("O usuarioId do criador é obrigatório.", 400);
        if (!data.titulo || !data.mensagem) throw new CustomError("Título e mensagem são obrigatórios.", 400);
        
        try {
            await InstituicaoRepository.getInstituicaoById(instituicaoId);
        } catch (error) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        const usuario = await UsuarioRepository.getUsuarioById(data.usuarioId);
        if (!usuario || usuario.instituicaoId !== instituicaoId) {
            throw new CustomError(`Usuário com ID ${data.usuarioId} não encontrado ou não pertence à esta instituição.`, 404);
        }

        // REGRA DE NEGÓCIO: Apenas administradores podem criar avisos.
        if (usuario.tipoAcesso.toLowerCase() !== 'administrador') {
            throw new CustomError("Apenas usuários administradores podem criar avisos.", 403);
        }

        const finalData = { ...data, instituicaoId };

        const novoAviso = await AvisoRepository.createAviso(finalData);

        return this.mapToResponse(novoAviso);
    }

    // GET: Busca um aviso por ID (URL: /instituicoes/:instituicaoId/avisos/:avisoId)
    async getAvisoById(instituicaoId: string, avisoId: string): Promise<AvisoResponse> {
        
        const aviso = await this.checkAvisoInstituicao(instituicaoId, avisoId);

        return this.mapToResponse(aviso);
    }

    // GET ALL: Busca todos os avisos de uma instituição (URL: /instituicoes/:instituicaoId/avisos)
    async getAllAvisos(instituicaoId: string): Promise<AvisoResponse[]> {
        
        try {
            await InstituicaoRepository.getInstituicaoById(instituicaoId);
        } catch (error) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        const avisos = await AvisoRepository.getAllAvisosByInstituicao(instituicaoId);

        if (avisos.length === 0) {
            throw new CustomError("Nenhum aviso cadastrado para esta instituição.", 404);
        }

        return avisos.map(a => this.mapToResponse(a));
    }

    // PATCH: Atualiza um aviso (URL: /instituicoes/:instituicaoId/avisos/:avisoId)
    async updateAvisoById(instituicaoId: string, avisoId: string, data: AvisoUpdateInput): Promise<AvisoResponse> {
        
        if (Object.keys(data).length === 0) {
            throw new CustomError("Nenhum campo fornecido para atualização.", 400);
        }
        
        await this.checkAvisoInstituicao(instituicaoId, avisoId);
        
        const updatedAviso = await AvisoRepository.updateAvisoById(avisoId, data);

        if (!updatedAviso) {
            throw new CustomError(`Falha na atualização do Aviso ${avisoId}.`, 500);
        }

        return this.mapToResponse(updatedAviso);
    }

    // DELETE: Exclui um aviso (URL: /instituicoes/:instituicaoId/avisos/:avisoId)
    async deleteAvisoById(instituicaoId: string, avisoId: string): Promise<boolean> {
        
        await this.checkAvisoInstituicao(instituicaoId, avisoId);

        const deleted = await AvisoRepository.deleteAvisoById(avisoId);
        
        if (!deleted) {
            throw new CustomError(`Falha na exclusão do Aviso ${avisoId}.`, 500);
        }
        
        return true;
    }

    // Helper para mapeamento
    private mapToResponse(aviso: Aviso): AvisoResponse {
        return {
            avisoId: aviso.avisoId,
            instituicaoId: aviso.instituicaoId,
            usuarioId: aviso.usuarioId,
            usuarioNome: aviso.usuarioNome,
            titulo: aviso.titulo,
            mensagem: aviso.mensagem,
            dataCriacao: aviso.dataCriacao,
            prioridade: aviso.prioridade,
            cursoAlvo: aviso.cursoAlvo,
        } as AvisoResponse;
    }
}

export default new AvisoService();