import UsuarioRepository from '../repositories/UsuarioRepository.ts';
import InstituicaoRepository from '../repositories/InstituicaoRepository.ts'; // Para validação da Instituição
import CustomError from '../middlewares/CustomError.ts';
import type { Usuario } from '../dtos/usuario/Usuario.dto.ts';
import type { UsuarioCreateInput } from '../dtos/usuario/UsuarioCreateInput.ts';
import type { UsuarioUpdateInput } from '../dtos/usuario/UsuarioUpdateInput.ts';
import type { UsuarioResponse } from '../dtos/usuario/UsuarioResponse.ts';

class UsuarioService {

    private async checkUsuarioInstituicao(instituicaoId: string, usuarioId: string): Promise<Usuario> {
        const usuario = await UsuarioRepository.getUsuarioById(usuarioId);

        if (!usuario) {
            throw new CustomError(`Usuário com ID ${usuarioId} não encontrado.`, 404);
        }
        
        // Regra de Negócio: O usuário deve pertencer à Instituição especificada na URL.
        if (usuario.instituicaoId !== instituicaoId) {
            throw new CustomError(`O Usuário ${usuarioId} não pertence à Instituição ${instituicaoId}. Acesso negado.`, 403);
        }

        return usuario;
    }
    
    // POST: Cria um novo usuário (URL: /instituicoes/:instituicaoId/usuarios)
    async createUsuario(instituicaoId: string, data: UsuarioCreateInput): Promise<UsuarioResponse> {
        
        if (!instituicaoId) throw new CustomError("O ID da instituição é obrigatório.", 400);

        if (!data.nome) throw new CustomError("O nome do usuário é obrigatório.", 400);
        // ... outras validações
        
        // 3. Validação de existência da Instituição
        try {
            // Reutiliza a lógica existente para checar se a instituição existe
            await InstituicaoRepository.getInstituicaoById(instituicaoId);
        } catch (error) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        const finalData = { ...data, instituicaoId };   

        const novoUsuario = await UsuarioRepository.createUsuario(finalData);

        return this.mapToResponse(novoUsuario);
    }

    // GET: Busca um usuário por ID (URL: /instituicoes/:instituicaoId/usuarios/:usuarioId)
    async getUsuarioById(instituicaoId: string, usuarioId: string): Promise<UsuarioResponse> {
        
        const usuario = await this.checkUsuarioInstituicao(instituicaoId, usuarioId);

        return this.mapToResponse(usuario);
    }

    // GET ALL: Busca todos os usuários de uma instituição (URL: /instituicoes/:instituicaoId/usuarios)
    async getAllUsuarios(instituicaoId: string): Promise<UsuarioResponse[]> {
        
        try {
            await InstituicaoRepository.getInstituicaoById(instituicaoId);
        } catch (error) {
            throw new CustomError(`Instituição com ID ${instituicaoId} não encontrada.`, 404);
        }

        const usuarios = await UsuarioRepository.getAllUsuariosByInstituicao(instituicaoId);
        usuarios.forEach(u => console.log('ID do Usuário no Service:', u.usuarioId));
        if (usuarios.length === 0) {
            throw new CustomError("Nenhum usuário cadastrado para esta instituição.", 404);
        }

        return usuarios.map(u => this.mapToResponse(u));
    }

    // PATCH: Atualiza um usuário (URL: /instituicoes/:instituicaoId/usuarios/:usuarioId)
    async updateUsuarioById(instituicaoId: string, usuarioId: string, data: UsuarioUpdateInput): Promise<UsuarioResponse> {
        
        if (Object.keys(data).length === 0) {
            throw new CustomError("Nenhum campo fornecido para atualização.", 400);
        }
        
        await this.checkUsuarioInstituicao(instituicaoId, usuarioId);
        
        const updatedUsuario = await UsuarioRepository.updateUsuarioById(usuarioId, data);

        if (!updatedUsuario) {
            throw new CustomError(`Falha na atualização do Usuário ${usuarioId}.`, 500);
        }

        return this.mapToResponse(updatedUsuario);
    }

    // DELETE: Exclui um usuário (URL: /instituicoes/:instituicaoId/usuarios/:usuarioId)
    async deleteUsuarioById(instituicaoId: string, usuarioId: string): Promise<boolean> {
        
        await this.checkUsuarioInstituicao(instituicaoId, usuarioId);

        const deleted = await UsuarioRepository.deleteUsuarioById(usuarioId);
        
        if (!deleted) {
            throw new CustomError(`Falha na exclusão do Usuário ${usuarioId}.`, 500);
        }
        
        return true;
    }

    private mapToResponse(usuario: Usuario): UsuarioResponse {
        return {
            usuarioId: usuario.usuarioId,
            instituicaoId: usuario.instituicaoId,
            nome: usuario.nome,
            email: usuario.email,
            tipoAcesso: usuario.tipoAcesso,
            curso: usuario.curso,
        } as UsuarioResponse;
    }
}

export default new UsuarioService();